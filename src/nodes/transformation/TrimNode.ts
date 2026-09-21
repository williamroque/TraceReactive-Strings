import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class TrimNode extends BaseNode {
    readonly typeId = 'string-trim';
    readonly displayName = 'Trim';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Result', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'mode',
            label: 'Mode',
            description: 'Where to trim whitespace',
            type: 'select',
            defaultValue: 'both',
            options: [
                { label: 'Both Ends', value: 'both' },
                { label: 'Start Only', value: 'start' },
                { label: 'End Only', value: 'end' }
            ]
        },
        {
            name: 'collapseWhitespace',
            label: 'Collapse Whitespace',
            description: 'Collapse multiple internal spaces into a single space',
            type: 'boolean',
            defaultValue: false
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';
        const mode = String(properties['mode'] || 'both');
        const collapse = properties['collapseWhitespace'] === true;

        let result = text;
        if (mode === 'start') {
            result = result.trimStart();
        } else if (mode === 'end') {
            result = result.trimEnd();
        } else {
            result = result.trim();
        }

        if (collapse) {
            result = result.replace(/\s+/g, ' ');
        }

        return { 'Result': result };
    }
}
