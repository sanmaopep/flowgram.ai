/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowDocumentJSON } from './typings';

export const initialData: FlowDocumentJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: {
          x: 180,
          y: 573.7,
        },
      },
      data: {
        title: 'Start',
        outputs: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              default: 'Hello Flow.',
            },
            enable: {
              type: 'boolean',
              default: true,
            },
            array_obj: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  int: {
                    type: 'number',
                  },
                  str: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 'condition_0',
      type: 'condition',
      meta: {
        position: {
          x: 1100,
          y: 510.20000000000005,
        },
      },
      data: {
        title: 'Condition',
        conditions: [
          {
            key: 'if_0',
            value: {
              left: {
                type: 'ref',
                content: ['start_0', 'query'],
              },
              operator: 'contains',
              right: {
                type: 'constant',
                content: 'Hello Flow.',
              },
            },
          },
          {
            key: 'if_f0rOAt',
            value: {
              left: {
                type: 'ref',
                content: ['start_0', 'enable'],
              },
              operator: 'is_true',
            },
          },
        ],
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: {
          x: 3008,
          y: 573.7,
        },
      },
      data: {
        title: 'End',
        inputs: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
    },
    {
      id: '159623',
      type: 'comment',
      meta: {
        position: {
          x: 180,
          y: 756.7,
        },
      },
      data: {
        size: {
          width: 240,
          height: 150,
        },
        note: 'hi ~\n\nthis is a comment node\n\n- flowgram.ai',
      },
    },
    {
      id: 'group_5ci0o',
      type: 'group',
      meta: {
        position: {
          x: 1644,
          y: 730.1999999999999,
        },
      },
      data: {},
      blocks: [
        {
          id: 'llm_8--A3',
          type: 'llm',
          meta: {
            position: {
              x: 180,
              y: 0,
            },
          },
          data: {
            title: 'LLM_1',
            inputsValues: {
              modelName: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              apiKey: {
                type: 'constant',
                content: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              },
              apiHost: {
                type: 'constant',
                content: 'https://mock-ai-url/api/v3',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: '# Role\nYou are an AI assistant.\n',
              },
              prompt: {
                type: 'constant',
                content: '# User Input\nquery:{{start_0.query}}\nenable:{{start_0.enable}}',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
              properties: {
                modelName: {
                  type: 'string',
                },
                apiKey: {
                  type: 'string',
                },
                apiHost: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
                prompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
              },
            },
            outputs: {
              type: 'object',
              properties: {
                result: {
                  type: 'string',
                },
              },
            },
          },
        },
        {
          id: 'llm_vTyMa',
          type: 'llm',
          meta: {
            position: {
              x: 640,
              y: 10,
            },
          },
          data: {
            title: 'LLM_2',
            inputsValues: {
              modelName: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              apiKey: {
                type: 'constant',
                content: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              },
              apiHost: {
                type: 'constant',
                content: 'https://mock-ai-url/api/v3',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: '# Role\nYou are an AI assistant.\n',
              },
              prompt: {
                type: 'constant',
                content: '# LLM Input\nresult:{{llm_8--A3.result}}',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
              properties: {
                modelName: {
                  type: 'string',
                },
                apiKey: {
                  type: 'string',
                },
                apiHost: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
                prompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
              },
            },
            outputs: {
              type: 'object',
              properties: {
                result: {
                  type: 'string',
                },
              },
            },
          },
        },
      ],
      edges: [
        {
          sourceNodeID: 'condition_0',
          targetNodeID: 'llm_8--A3',
          sourcePortID: 'if_0',
        },
        {
          sourceNodeID: 'llm_8--A3',
          targetNodeID: 'llm_vTyMa',
        },
        {
          sourceNodeID: 'llm_vTyMa',
          targetNodeID: 'end_0',
        },
      ],
    },
    {
      id: 'loop_ANNyh',
      type: 'loop',
      meta: {
        position: {
          x: 1480,
          y: 90,
        },
      },
      data: {
        title: 'Loop_1',
        loopFor: {
          type: 'ref',
          content: ['start_0', 'array_obj'],
        },
      },
      blocks: [
        {
          id: 'llm_6aSyo',
          type: 'llm',
          meta: {
            position: {
              x: 344,
              y: 0,
            },
          },
          data: {
            title: 'LLM_3',
            inputsValues: {
              modelName: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              apiKey: {
                type: 'constant',
                content: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              },
              apiHost: {
                type: 'constant',
                content: 'https://mock-ai-url/api/v3',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: '# Role\nYou are an AI assistant.\n',
              },
              prompt: {
                type: 'constant',
                content: '',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
              properties: {
                modelName: {
                  type: 'string',
                },
                apiKey: {
                  type: 'string',
                },
                apiHost: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
                prompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
              },
            },
            outputs: {
              type: 'object',
              properties: {
                result: {
                  type: 'string',
                },
              },
            },
          },
        },
        {
          id: 'llm_ZqKlP',
          type: 'llm',
          meta: {
            position: {
              x: 804,
              y: 0,
            },
          },
          data: {
            title: 'LLM_4',
            inputsValues: {
              modelName: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              apiKey: {
                type: 'constant',
                content: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              },
              apiHost: {
                type: 'constant',
                content: 'https://mock-ai-url/api/v3',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: '# Role\nYou are an AI assistant.\n',
              },
              prompt: {
                type: 'constant',
                content: '',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
              properties: {
                modelName: {
                  type: 'string',
                },
                apiKey: {
                  type: 'string',
                },
                apiHost: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
                prompt: {
                  type: 'string',
                  extra: {
                    formComponent: 'prompt-editor',
                  },
                },
              },
            },
            outputs: {
              type: 'object',
              properties: {
                result: {
                  type: 'string',
                },
              },
            },
          },
        },
        {
          id: 'block_start_loop_ANNyh',
          type: 'block-start',
          meta: {
            position: {
              x: 31.999999999999943,
              y: 163.1,
            },
          },
          data: {},
        },
        {
          id: 'block_end_loop_ANNyh',
          type: 'block-end',
          meta: {
            position: {
              x: 1116,
              y: 163.1,
            },
          },
          data: {},
        },
      ],
      edges: [
        {
          sourceNodeID: 'block_start_loop_ANNyh',
          targetNodeID: 'llm_6aSyo',
        },
        {
          sourceNodeID: 'llm_6aSyo',
          targetNodeID: 'llm_ZqKlP',
        },
        {
          sourceNodeID: 'llm_ZqKlP',
          targetNodeID: 'block_end_loop_ANNyh',
        },
      ],
    },
    {
      id: 'http_rDGIH',
      type: 'http',
      meta: {
        position: {
          x: 640,
          y: 511.20000000000005,
        },
      },
      data: {
        title: 'HTTP_1',
        outputs: {
          type: 'object',
          properties: {
            body: {
              type: 'string',
            },
            headers: {
              type: 'object',
            },
            statusCode: {
              type: 'integer',
            },
          },
        },
      },
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'http_rDGIH',
    },
    {
      sourceNodeID: 'http_rDGIH',
      targetNodeID: 'condition_0',
    },
    {
      sourceNodeID: 'condition_0',
      targetNodeID: 'llm_8--A3',
      sourcePortID: 'if_0',
    },
    {
      sourceNodeID: 'condition_0',
      targetNodeID: 'loop_ANNyh',
      sourcePortID: 'if_f0rOAt',
    },
    {
      sourceNodeID: 'llm_vTyMa',
      targetNodeID: 'end_0',
    },
    {
      sourceNodeID: 'loop_ANNyh',
      targetNodeID: 'end_0',
    },
  ],
};
