import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class StartsWithNode extends BaseNode {
    readonly typeId = 'string-starts-with';
    readonly displayName = 'Starts With';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' },
        { name: 'Prefix', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Matches', outputType: 'core:boolean' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'prefix',
            label: 'Prefix',
            description: 'Prefix to test against',
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
        const prefix = inputs['Prefix'] !== undefined && inputs['Prefix'] !== null ? String(inputs['Prefix']) : String(properties['prefix'] || '');
        const caseSensitive = properties['caseSensitive'] !== false;

        const source = caseSensitive ? text : text.toLowerCase();
        const target = caseSensitive ? prefix : prefix.toLowerCase();

        return {
            'Matches': source.startsWith(target)
        };
    }
}
