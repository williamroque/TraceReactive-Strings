import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class EndsWithNode extends BaseNode {
    readonly typeId = 'string-ends-with';
    readonly displayName = 'Ends With';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' },
        { name: 'Suffix', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Matches', outputType: 'core:any' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'suffix',
            label: 'Suffix',
            description: 'Suffix to test against',
            type: 'string',
            defaultValue: ''
        },
        {
            name: 'caseSensitive',
            label: 'Case Sensitive',
            description: 'Whether comparison is case-sensitive',
            type: 'boolean',
            defaultValue: true
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';
        const suffix = inputs['Suffix'] !== undefined && inputs['Suffix'] !== null ? String(inputs['Suffix']) : String(properties['suffix'] || '');
        const caseSensitive = properties['caseSensitive'] !== false;

        const source = caseSensitive ? text : text.toLowerCase();
        const target = caseSensitive ? suffix : suffix.toLowerCase();

        return {
            'Matches': source.endsWith(target)
        };
    }
}
