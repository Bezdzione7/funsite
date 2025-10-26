// AI features stub - these should be migrated to Lovable AI via Supabase Edge Functions
export async function resolveQuestion(question: string, requiresWebSearch: boolean, data?: string) {
  console.log('resolveQuestion stub called:', { question, requiresWebSearch, data });
  return {
    resolution: false,
    confidence: 0,
    reasoning: 'AI features need to be migrated to Lovable AI'
  };
}

export async function getRugplayData(question?: string) {
  console.log('getRugplayData stub called:', question);
  return 'Market data not available';
}

export async function validateQuestion(question: string, description?: string) {
  console.log('validateQuestion stub called:', { question, description });
  return {
    isValid: false,
    requiresWebSearch: false,
    reason: 'AI features need to be migrated to Lovable AI'
  };
}

export async function resolvePrediction(questionId: number) {
  console.log('resolvePrediction stub called:', questionId);
  return { success: false };
}
