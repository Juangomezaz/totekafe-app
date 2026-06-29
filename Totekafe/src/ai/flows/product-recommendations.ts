// src/ai/flows/product-recommendations.ts
'use server';

/**
 * @fileOverview A flow for providing personalized coffee product recommendations.
 *
 * - getProductRecommendations - A function that returns product recommendations based on browsing history.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe(
      'Una lista de Ids de productos separados por comas que representa el historial de navegación del cliente.'
    ),
});

export type ProductRecommendationsInput = z.infer<
  typeof ProductRecommendationsInputSchema
>;

const ProductRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'Una lista de Ids de productos separados por comas que representa los productos recomendados.'
    ),
});

export type ProductRecommendationsOutput = z.infer<
  typeof ProductRecommendationsOutputSchema
>;

export async function getProductRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `Eres un asistente de compras personal para Totekafe. Recomienda algunos productos de Totekafe basándote en el historial de navegación proporcionado.

Historial de Navegación: {{{browsingHistory}}}

Recomendaciones:`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
