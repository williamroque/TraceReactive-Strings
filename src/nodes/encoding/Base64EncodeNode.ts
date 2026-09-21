import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class Base64EncodeNode extends BaseNode {
    readonly typeId = 'string-base64-encode';
    readonly displayName = 'Base64 Encode';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Base64', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';

        if (!text) {
            return { 'Base64': '' };
        }

        try {
            const bytes = new TextEncoder().encode(text);
            const binString = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
            return { 'Base64': btoa(binString) };
        } catch {
            return { 'Base64': '' };
        }
    }
}
