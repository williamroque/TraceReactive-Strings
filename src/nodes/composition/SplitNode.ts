import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class SplitNode extends BaseNode {
    readonly typeId = 'string-split';
    readonly displayName = 'Split';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' },
        { name: 'Delimiter', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Array', outputType: 'core:string-array' },
        { name: 'Count', outputType: 'core:number' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'delimiter',
            label: 'Delimiter',
            description: 'Delimiter to split by',
            type: 'string',
            defaultValue: ','
        },
        {
            name: 'isRegex',
            label: 'Is Regex',
            description: 'Treat delimiter as a regular expression',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'trimItems',
            label: 'Trim Items',
            description: 'Trim whitespace from each resulting item',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'removeEmpty',
            label: 'Remove Empty',
            description: 'Exclude empty strings from result',
            type: 'boolean',
            defaultValue: false
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';
        const delimiter = inputs['Delimiter'] !== undefined && inputs['Delimiter'] !== null
            ? String(inputs['Delimiter'])
            : String(properties['delimiter'] !== undefined ? properties['delimiter'] : ',');
        const isRegex = properties['isRegex'] === true;
        const trimItems = properties['trimItems'] === true;
        const removeEmpty = properties['removeEmpty'] === true;

        if (!text) {
            return {
                'Array': [],
                'Count': 0
            };
        }

        let rawItems: string[] = [];
        try {
            if (isRegex) {
                rawItems = text.split(new RegExp(delimiter));
            } else {
                rawItems = text.split(delimiter);
            }
        } catch {
            rawItems = [text];
        }

        if (trimItems) {
            rawItems = rawItems.map(item => item.trim());
        }

        if (removeEmpty) {
            rawItems = rawItems.filter(item => item.length > 0);
        }

        return {
            'Array': rawItems,
            'Count': rawItems.length
        };
    }
}
