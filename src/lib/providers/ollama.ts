import { getOllamaApiEndpoint } from '../../config';
import logger from '../../utils/logger';
import { OllamaEmbeddings } from '@langchain/ollama';
import { ChatOllama } from '@langchain/ollama';

export const loadOllamaChatModels = async () => {
  const ollamaEndpoint = getOllamaApiEndpoint();

  if (!ollamaEndpoint) return {};

  try {
    const response = await fetch(`${ollamaEndpoint}/api/tags`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { models: ollamaModels } = (await response.json()) as any;

    const chatModels = ollamaModels.reduce((acc, model) => {
      acc[model.model] = new ChatOllama({
        baseUrl: ollamaEndpoint,
        model: model.model,
        temperature: 0.7,
        keepAlive: -1,
      });
      return acc;
    }, {});

    return chatModels;
  } catch (err) {
    logger.error(`Error loading Ollama models: ${err}`);
    return {};
  }
};

export const loadOllamaEmbeddingsModels = async () => {
  const ollamaEndpoint = getOllamaApiEndpoint();

  if (!ollamaEndpoint) return {};

  try {
    const response = await fetch(`${ollamaEndpoint}/api/tags`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { models: ollamaModels } = (await response.json()) as any;

    const embeddingsModels = ollamaModels.reduce((acc, model) => {
      acc[model.model] = new OllamaEmbeddings({
        baseUrl: ollamaEndpoint,
        model: model.model,
      });
      return acc;
    }, {});

    return embeddingsModels;
  } catch (err) {
    logger.error(`Error loading Ollama embeddings model: ${err}`);
    return {};
  }
};
