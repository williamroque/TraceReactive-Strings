import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class UrlDecodeNode extends BaseNode {
    readonly typeId = 'string-url-decode';
    readonly displayName = 'URL Decode';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Encoded', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Text', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'componentOnly',
            label: 'Component Only',
            description: 'Use decodeURIComponent instead of decodeURI',
            type: 'boolean',
            defaultValue: true
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const encoded = inputs['Encoded'] !== undefined && inputs['Encoded'] !== null ? String(inputs['Encoded']) : '';
        const componentOnly = properties['componentOnly'] !== false;

        if (!encoded) {
            return { 'Text': '' };
        }

        try {
            const decoded = componentOnly ? decodeURIComponent(encoded) : decodeURI(encoded);
            return { 'Text': decoded };
        } catch {
            return { 'Text': encoded };
        }
    }
}
