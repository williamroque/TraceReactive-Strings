import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class ContainsNode extends BaseNode {
    readonly typeId = 'string-contains';
    readonly displayName = 'Contains';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' },
        { name: 'Search', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Found', outputType: 'core:boolean' },
        { name: 'Index', outputType: 'core:number' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'search',
            label: 'Search String',
            description: 'Substring to look for',
            type: 'string',
            defaultValue: ''
        },
        {
            name: 'caseSensitive',
            label: 'Case Sensitive',
            description: 'Whether search is case-sensitive',
            type: 'boolean',
            defaultValue: true
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';
        const search = inputs['Search'] !== undefined && inputs['Search'] !== null ? String(inputs['Search']) : String(properties['search'] || '');
        const caseSensitive = properties['caseSensitive'] !== false;

        if (!search) {
            return {
                'Found': false,
                'Index': -1
            };
        }

        const source = caseSensitive ? text : text.toLowerCase();
        const target = caseSensitive ? search : search.toLowerCase();
        const index = source.indexOf(target);

        return {
            'Found': index !== -1,
            'Index': index
        };
    }
}
