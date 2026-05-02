import { inbody } from '../data/sarah';

export function useInBody() {
  return {
    data: inbody,
    isLoading: false,
    error: null,
  };
}
