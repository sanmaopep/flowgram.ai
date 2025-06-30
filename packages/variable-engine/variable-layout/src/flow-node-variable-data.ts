import { BaseVariableField, VariableEngine } from '@flowgram.ai/variable-core';
import { type ASTNode, ASTNodeJSON } from '@flowgram.ai/variable-core';
import { FlowNodeEntity } from '@flowgram.ai/document';
import { EntityData } from '@flowgram.ai/core';

import { FlowNodeScope, FlowNodeScopeMeta, FlowNodeScopeTypeEnum } from './types';

interface Options {
  variableEngine: VariableEngine;
}

export class FlowNodeVariableData extends EntityData {
  static type: string = 'FlowNodeVariableData';

  declare entity: FlowNodeEntity;

  readonly variableEngine: VariableEngine;

  /**
   * Private variables can be accessed by public ones, but not the other way around.
   */
  protected _private?: FlowNodeScope;

  protected _public: FlowNodeScope;

  get private() {
    return this._private;
  }

  get public() {
    return this._public;
  }

  /**
   * Sets a variable in the public AST (Abstract Syntax Tree) with the given key and JSON value.
   *
   * @param key - The key under which the variable will be stored.
   * @param json - The JSON value to store.
   * @returns The updated AST node.
   */
  public setVar(key: string, json: ASTNodeJSON): ASTNode;

  /**
   * Sets a variable in the public AST (Abstract Syntax Tree) with the default key 'outputs'.
   *
   * @param json - The JSON value to store.
   * @returns The updated AST node.
   */
  public setVar(json: ASTNodeJSON): ASTNode;

  public setVar(arg1: string | ASTNodeJSON, arg2?: ASTNodeJSON): ASTNode {
    if (typeof arg1 === 'string' && arg2 !== undefined) {
      return this.public.ast.set(arg1, arg2);
    }

    if (typeof arg1 === 'object' && arg2 === undefined) {
      return this.public.ast.set('outputs', arg1);
    }

    throw new Error('Invalid arguments');
  }

  /**
   * Retrieves a variable from the public AST (Abstract Syntax Tree) by key.
   *
   * @param key - The key of the variable to retrieve. Defaults to 'outputs'.
   * @returns The value of the variable, or undefined if not found.
   */
  public getVar(key: string = 'outputs') {
    return this.public.ast.get(key);
  }

  /**
   * Clears a variable from the public AST (Abstract Syntax Tree) by key.
   *
   * @param key - The key of the variable to clear. Defaults to 'outputs'.
   * @returns The updated AST node.
   */
  public clearVar(key: string = 'outputs') {
    return this.public.ast.remove(key);
  }

  /**
   * Sets a variable in the private AST (Abstract Syntax Tree) with the given key and JSON value.
   *
   * @param key - The key under which the variable will be stored.
   * @param json - The JSON value to store.
   * @returns The updated AST node.
   */
  public setPrivateVar(key: string, json: ASTNodeJSON): ASTNode;

  /**
   * Sets a variable in the private AST (Abstract Syntax Tree) with the default key 'outputs'.
   *
   * @param json - The JSON value to store.
   * @returns The updated AST node.
   */
  public setPrivateVar(json: ASTNodeJSON): ASTNode;

  public setPrivateVar(arg1: string | ASTNodeJSON, arg2?: ASTNodeJSON): ASTNode {
    if (typeof arg1 === 'string' && arg2 !== undefined) {
      return this.initPrivate().ast.set(arg1, arg2);
    }

    if (typeof arg1 === 'object' && arg2 === undefined) {
      return this.initPrivate().ast.set('outputs', arg1);
    }

    throw new Error('Invalid arguments');
  }

  /**
   * Retrieves a variable from the private AST (Abstract Syntax Tree) by key.
   *
   * @param key - The key of the variable to retrieve. Defaults to 'outputs'.
   * @returns The value of the variable, or undefined if not found.
   */
  public getPrivateVar(key: string = 'outputs') {
    return this.private?.ast.get(key);
  }

  /**
   * Clears a variable from the private AST (Abstract Syntax Tree) by key.
   *
   * @param key - The key of the variable to clear. Defaults to 'outputs'.
   * @returns The updated AST node.
   */
  public clearPrivateVar(key: string = 'outputs') {
    return this.private?.ast.remove(key);
  }

  get allScopes(): FlowNodeScope[] {
    const res = [];

    if (this._public) {
      res.push(this._public);
    }
    if (this._private) {
      res.push(this._private);
    }

    return res;
  }

  getDefaultData() {
    return {};
  }

  constructor(entity: FlowNodeEntity, readonly opts: Options) {
    super(entity);

    const { variableEngine } = opts || {};
    this.variableEngine = variableEngine;
    this._public = this.variableEngine.createScope(this.entity.id, {
      node: this.entity,
      type: FlowNodeScopeTypeEnum.public,
    } as FlowNodeScopeMeta);
    this.toDispose.push(this._public);
  }

  initPrivate(): FlowNodeScope {
    if (!this._private) {
      this._private = this.variableEngine.createScope(`${this.entity.id}_private`, {
        node: this.entity,
        type: FlowNodeScopeTypeEnum.private,
      } as FlowNodeScopeMeta);
      // 1. Notify the covering scopes of private to update dependencies
      this._private.coverScopes.forEach((_scope) => {
        _scope.refreshDeps();
      });
      // 2. Notify the dependent scopes of private to update their covers
      this._private.depScopes.forEach((_scope) => {
        _scope.refreshCovers();
      });
      // 3. The private scope itself needs to refresh its dependencies
      this._private.available.refresh();

      this.toDispose.push(this._private);
    }
    return this._private;
  }

  /**
   * Find a variable field by key path in the public scope by scope chain.
   * @param keyPath - The key path of the variable field.
   * @returns The variable field, or undefined if not found.
   */
  getByKeyPath(keyPath: string[]): BaseVariableField | undefined {
    return this.public.available.getByKeyPath(keyPath);
  }

  /**
   * Find a variable field by key path in the private scope by scope chain.
   * @param keyPath - The key path of the variable field.
   * @returns The variable field, or undefined if not found.
   */
  getByKeyPathInPrivate(keyPath: string[]): BaseVariableField | undefined {
    return this.private?.available.getByKeyPath(keyPath);
  }
}
