import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class SplitLinesNode extends BaseNode {
    readonly typeId = 'string-split-lines';
    readonly displayName = 'Split Lines';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Lines', outputType: 'core:string-array' },
        { name: 'Count', outputType: 'core:number' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'removeEmpty',
            label: 'Remove Empty Lines',
            description: 'Exclude empty lines from result',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'trimLines',
            label: 'Trim Lines',
            description: 'Trim whitespace from each line',
            type: 'boolean',
            defaultValue: false
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';
        const removeEmpty = properties['removeEmpty'] === true;
        const trimLines = properties['trimLines'] === true;

        if (!text) {
            return {
                'Lines': [],
                'Count': 0
            };
        }

        let lines = text.split(/\r\n|\r|\n/);

        if (trimLines) {
            lines = lines.map(line => line.trim());
        }

        if (removeEmpty) {
            lines = lines.filter(line => line.length > 0);
        }

        return {
            'Lines': lines,
            'Count': lines.length
        };
    }
}
