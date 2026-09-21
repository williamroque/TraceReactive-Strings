import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class TemplateNode extends BaseNode {
    readonly typeId = 'string-template';
    readonly displayName = 'Template';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Value 1', acceptsType: 'core:any' }
    ];

    readonly dynamicInputs = { baseName: 'Value', acceptsType: 'core:any' };

    readonly outputs: OutputDefinition[] = [
        { name: 'Result', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'template',
            label: 'Template',
            description: 'Template with placeholders like {1}, {value_1}, or {Value 1}',
            type: 'text',
            defaultValue: 'Hello {1}!'
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        let template = String(properties['template'] || '');

        for (let i = 1; i <= 100; i++) {
            const key = `Value ${i}`;
            if (inputs[key] !== undefined && inputs[key] !== null) {
                const val = typeof inputs[key] === 'object' ? JSON.stringify(inputs[key]) : String(inputs[key]);
                const patterns = [
                    new RegExp(`\\{${i}\\}`, 'g'),
                    new RegExp(`\\{value_${i}\\}`, 'gi'),
                    new RegExp(`\\{value${i}\\}`, 'gi'),
                    new RegExp(`\\{Value\\s+${i}\\}`, 'gi')
                ];
                for (const p of patterns) {
                    template = template.replace(p, val);
                }
            }
        }

        return { 'Result': template };
    }
}
