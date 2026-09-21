import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class JsonStringifyNode extends BaseNode {
    readonly typeId = 'string-json-stringify';
    readonly displayName = 'JSON Stringify';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Data', acceptsType: 'core:data' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'JSON String', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'pretty',
            label: 'Pretty Print',
            description: 'Format with indents and line breaks',
            type: 'boolean',
            defaultValue: true
        },
        {
            name: 'indent',
            label: 'Indent Spaces',
            description: 'Number of spaces for indentation',
            type: 'number',
            defaultValue: 2
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const data = inputs['Data'];
        const pretty = properties['pretty'] !== false;
        const indent = Number(properties['indent'] || 2);

        if (data === undefined) {
            return { 'JSON String': '' };
        }

        try {
            const result = pretty ? JSON.stringify(data, null, indent) : JSON.stringify(data);
            return { 'JSON String': result || '' };
        } catch {
            return { 'JSON String': '' };
        }
    }
}
