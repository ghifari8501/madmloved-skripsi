import useSwr from 'swr'

const base_url = `${process.env.NEXT_PUBLIC_APP_URL}/api`;

export interface Fetcher {
  url: string;
  request?: RequestInit;
}




const fetcher = (options: Fetcher) =>
  fetch(`${base_url}${options.url}`, { ...options.request })
    .then((res) => {
      if (!res.ok) {
        const error: Error & { status?: number } = new Error();
        error.status = res.status;
        error.message = "Failed to get request";

        throw error;
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });

export const invokeAPI = async (options: Fetcher) =>
  fetch(`${base_url}${options.url}`, { ...options.request }).then((res) =>
    res.json()
  );

export {fetcher, useSwr};