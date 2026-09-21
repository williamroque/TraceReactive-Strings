import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class ReplaceNode extends BaseNode {
    readonly typeId = 'string-replace';
    readonly displayName = 'Replace';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' },
        { name: 'Search', acceptsType: 'core:string' },
        { name: 'Replace', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Result', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'search',
            label: 'Search',
            description: 'Text or pattern to replace',
            type: 'string',
            defaultValue: ''
        },
        {
            name: 'replacement',
            label: 'Replacement',
            description: 'Replacement string (supports $1, $2 for regex)',
            type: 'string',
            defaultValue: ''
        },
        {
            name: 'isRegex',
            label: 'Is Regex',
            description: 'Treat search string as regular expression',
            type: 'boolean',
            defaultValue: false
        },
        {
            name: 'global',
            label: 'Global Replace',
            description: 'Replace all occurrences',
            type: 'boolean',
            defaultValue: true
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
        const replacement = inputs['Replace'] !== undefined && inputs['Replace'] !== null ? String(inputs['Replace']) : String(properties['replacement'] || '');
        const isRegex = properties['isRegex'] === true;
        const isGlobal = properties['global'] !== false;
        const caseSensitive = properties['caseSensitive'] !== false;

        if (!search) {
            return { 'Result': text };
        }

        try {
            if (isRegex) {
                let flags = '';
                if (isGlobal) flags += 'g';
                if (!caseSensitive) flags += 'i';
                const regex = new RegExp(search, flags);
                return { 'Result': text.replace(regex, replacement) };
            }

            if (isGlobal) {
                if (caseSensitive) {
                    return { 'Result': text.replaceAll(search, replacement) };
                }
                const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(escaped, 'gi');
                return { 'Result': text.replace(regex, replacement) };
            }

            if (caseSensitive) {
                return { 'Result': text.replace(search, replacement) };
            }
            const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escaped, 'i');
            return { 'Result': text.replace(regex, replacement) };
        } catch {
            return { 'Result': text };
        }
    }
}
