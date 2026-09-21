import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class RegexMatchNode extends BaseNode {
    readonly typeId = 'string-regex-match';
    readonly displayName = 'Regex Match';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' },
        { name: 'Pattern', acceptsType: 'core:string' },
        { name: 'Flags', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Matched', outputType: 'core:boolean' },
        { name: 'Full Match', outputType: 'core:string' },
        { name: 'Matches', outputType: 'core:string-array' },
        { name: 'Groups', outputType: 'core:data' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'pattern',
            label: 'Pattern',
            description: 'Regular expression pattern',
            type: 'string',
            defaultValue: ''
        },
        {
            name: 'flags',
            label: 'Flags',
            description: 'RegExp flags such as g, i, m, s, u',
            type: 'string',
            defaultValue: 'g'
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';
        const pattern = inputs['Pattern'] !== undefined && inputs['Pattern'] !== null ? String(inputs['Pattern']) : String(properties['pattern'] || '');
        const flags = inputs['Flags'] !== undefined && inputs['Flags'] !== null ? String(inputs['Flags']) : String(properties['flags'] || '');

        if (!pattern) {
            return {
                'Matched': false,
                'Full Match': '',
                'Matches': [],
                'Groups': {}
            };
        }

        try {
            const regex = new RegExp(pattern, flags);
            const isGlobal = flags.includes('g');

            if (isGlobal) {
                const allMatches = Array.from(text.matchAll(regex));
                const matches = allMatches.filter(m => m[0].length > 0);
                const matchedStrings = matches.map(m => m[0]);
                const firstMatch = matches[0];
                const groups = firstMatch && firstMatch.groups ? { ...firstMatch.groups } : {};

                return {
                    'Matched': matches.length > 0,
                    'Full Match': firstMatch ? firstMatch[0] : '',
                    'Matches': matchedStrings,
                    'Groups': groups
                };
            }

            const match = text.match(regex);
            return {
                'Matched': Boolean(match),
                'Full Match': match ? match[0] : '',
                'Matches': match ? [match[0]] : [],
                'Groups': match && match.groups ? { ...match.groups } : {}
            };
        } catch {
            return {
                'Matched': false,
                'Full Match': '',
                'Matches': [],
                'Groups': {}
            };
        }
    }
}
