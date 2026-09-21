import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class JsonParseNode extends BaseNode {
    readonly typeId = 'string-json-parse';
    readonly displayName = 'JSON Parse';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'JSON String', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Data', outputType: 'core:data' },
        { name: 'Success', outputType: 'core:boolean' },
        { name: 'Error', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const jsonStr = inputs['JSON String'];

        if (jsonStr === undefined || jsonStr === null || jsonStr === '') {
            return {
                'Data': null,
                'Success': false,
                'Error': 'Input is empty'
            };
        }

        try {
            const parsed = JSON.parse(String(jsonStr));
            return {
                'Data': parsed,
                'Success': true,
                'Error': ''
            };
        } catch (err: any) {
            return {
                'Data': null,
                'Success': false,
                'Error': err && err.message ? String(err.message) : 'Invalid JSON'
            };
        }
    }
}
