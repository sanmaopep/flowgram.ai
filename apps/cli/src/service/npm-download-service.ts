/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable } from "inversify";
import download from 'download';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as tar from 'tar';

@injectable()
export class NpmDownloadService {
  private tempDir = path.join(__dirname, './temp');

  constructor() {
    fs.ensureDirSync(this.tempDir);
  }

  private async getLatestVersion(packageName: string): Promise<string> {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    const data = await response.json() as any;
    return data['dist-tags'].latest;
  }

  public async download(packageName: string): Promise<string> {
    const latestVersion = await this.getLatestVersion(packageName);
    const packageDir = path.join(this.tempDir, `${packageName}@${latestVersion}`);

    if (fs.existsSync(packageDir)) {
      return packageDir;
    }

    const tarballUrl = `https://registry.npmjs.org/${packageName}/-/${packageName}-${latestVersion}.tgz`;
    const tarballPath = path.join(this.tempDir, `${packageName}-${latestVersion}.tgz`);

    await download(tarballUrl, this.tempDir);

    await tar.x({
      file: tarballPath,
      cwd: packageDir,
      strip: 1,
    });

    await fs.remove(tarballPath);

    return packageDir;
  }
}
