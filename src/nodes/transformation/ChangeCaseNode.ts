import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class ChangeCaseNode extends BaseNode {
    readonly typeId = 'string-change-case';
    readonly displayName = 'Change Case';
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
            name: 'caseType',
            label: 'Case',
            description: 'Target casing style',
            type: 'select',
            defaultValue: 'uppercase',
            options: [
                { label: 'UPPERCASE', value: 'uppercase' },
                { label: 'lowercase', value: 'lowercase' },
                { label: 'Capitalize', value: 'capitalize' },
                { label: 'Title Case', value: 'titlecase' },
                { label: 'camelCase', value: 'camelcase' },
                { label: 'kebab-case', value: 'kebabcase' },
                { label: 'snake_case', value: 'snakecase' }
            ]
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';
        const caseType = String(properties['caseType'] || 'uppercase');

        if (!text) {
            return { 'Result': '' };
        }

        let result = text;
        switch (caseType) {
            case 'uppercase':
                result = text.toUpperCase();
                break;
            case 'lowercase':
                result = text.toLowerCase();
                break;
            case 'capitalize':
                result = text.charAt(0).toUpperCase() + text.slice(1);
                break;
            case 'titlecase':
                result = text.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
                break;
            case 'camelcase': {
                const words = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];
                result = words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
                break;
            }
            case 'kebabcase': {
                const words = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];
                result = words.map(w => w.toLowerCase()).join('-');
                break;
            }
            case 'snakecase': {
                const words = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];
                result = words.map(w => w.toLowerCase()).join('_');
                break;
            }
        }

        return { 'Result': result };
    }
}
