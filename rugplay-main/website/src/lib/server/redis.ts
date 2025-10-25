import { createClient } from 'redis';
import { building } from '$app/environment';

// Optional Redis configuration - only initialize if environment variable is present
let redis: any = null;

// Initialize Redis client if environment variable is available
function initializeRedis() {
    try {
        const REDIS_URL = process.env.REDIS_URL;
        
        if (REDIS_URL) {
            const redisUrl = REDIS_URL || 'redis://localhost:6379';
            
            const client = createClient({
                url: redisUrl
            });

            client.on('error', (err: any) => console.error('Redis Client Error:', err));

            if (!building) {
                client.connect().catch(console.error);
            }
            
            redis = client;
        }
    } catch (error) {
        // Redis configuration not available - this is optional
        console.log('Redis configuration not available - real-time features disabled');
    }
}

// Initialize Redis on module load
initializeRedis();

export { redis };
