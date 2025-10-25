import { createClient } from 'redis';
import { building } from '$app/environment';

// Redis is disabled for now - no environment variables needed
let redis: any = null;

export { redis };
