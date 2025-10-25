<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { getTimeBasedGreeting, formatPrice, formatMarketCap } from '$lib/utils';
	import { USER_DATA } from '$lib/stores/user-data';
	import SignInConfirmDialog from '$lib/components/self/SignInConfirmDialog.svelte';
	import CoinIcon from '$lib/components/self/CoinIcon.svelte';
	import DataTable from '$lib/components/self/DataTable.svelte';
	import HomeSkeleton from '$lib/components/self/skeletons/HomeSkeleton.svelte';
	import SEO from '$lib/components/self/SEO.svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { 
		Sparkles, 
		TrendingUp, 
		Users, 
		Coins, 
		Star,
		ArrowRight,
		Zap,
		Shield,
		Gamepad2
	} from 'lucide-svelte';

	let shouldSignIn = $state(false);
	let items = $state<any[]>([]);
	let loading = $state(true);
	let stats = $state({
		totalItems: 0,
		totalUsers: 0,
		totalVolume: 0,
		activeTrades: 0
	});

	onMount(async () => {
		try {
			const response = await fetch('/api/coins/top');
			if (response.ok) {
				const result = await response.json();
				items = result.coins;
				stats.totalItems = items.length;
				stats.totalVolume = items.reduce((sum, item) => sum + item.volume24h, 0);
			} else {
				toast.error('Failed to load items');
			}
		} catch (e) {
			console.error('Failed to fetch items:', e);
			toast.error('Failed to load items');
		} finally {
			loading = false;
		}
	});

	const marketColumns = [
		{
			key: 'name',
			label: 'Item',
			class: 'font-medium',
			render: (value: any, row: any) => {
				return {
					component: 'coin',
					icon: row.icon,
					symbol: row.symbol,
					name: row.name,
					size: 6
				};
			}
		},
		{
			key: 'price',
			label: 'Price (Robux)',
			render: (value: any) => `${formatPrice(value)} R$`
		},
		{
			key: 'change24h',
			label: '24h Change',
			render: (value: any) => ({
				component: 'badge',
				variant: value >= 0 ? 'success' : 'destructive',
				text: `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
			})
		},
		{
			key: 'marketCap',
			label: 'Total Value',
			render: (value: any) => formatMarketCap(value)
		},
		{
			key: 'volume24h',
			label: 'Sales (24h)',
			render: (value: any) => formatMarketCap(value)
		}
	];
</script>

<SEO
	title="RobuxMarket - Premium Robux Trading Platform"
	description="Trade virtual items with Robux on the most advanced trading platform. Buy, sell, and discover rare items with real Robux currency."
	keywords="robux trading, virtual items, roblox trading, robux marketplace, virtual economy"
/>

<SignInConfirmDialog bind:open={shouldSignIn} />

<!-- Hero Section with Gradient Background -->
<div class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
	<div class="absolute inset-0 bg-black/20"></div>
	<div class="relative container mx-auto px-6 py-16">
		<div class="text-center text-white">
			<div class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
				<Sparkles class="h-4 w-4" />
				<span class="text-sm font-medium">Premium Trading Platform</span>
			</div>
			
			<h1 class="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
				{#if $USER_DATA}
					{getTimeBasedGreeting($USER_DATA?.name)}
				{:else}
					Welcome to RobuxMarket
				{/if}
			</h1>
			
			<p class="mb-8 text-xl text-blue-100 md:text-2xl">
				{#if $USER_DATA}
					Trade virtual items with real Robux currency
				{:else}
					The most advanced Robux trading platform
				{/if}
			</p>

			{#if !$USER_DATA}
				<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<Button 
						size="lg" 
						class="bg-white text-blue-600 hover:bg-blue-50"
						onclick={() => (shouldSignIn = true)}
					>
						<Gamepad2 class="mr-2 h-5 w-5" />
						Start Trading
					</Button>
					<Button 
						size="lg" 
						variant="outline" 
						class="border-white/30 text-white hover:bg-white/10"
						onclick={() => goto('/market')}
					>
						Explore Market
						<ArrowRight class="ml-2 h-5 w-5" />
					</Button>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Stats Section -->
<div class="border-b bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
	<div class="container mx-auto px-6 py-8">
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			<div class="text-center">
				<div class="mb-2 text-3xl font-bold text-blue-600">{stats.totalItems}</div>
				<div class="text-sm text-muted-foreground">Active Items</div>
			</div>
			<div class="text-center">
				<div class="mb-2 text-3xl font-bold text-green-600">{stats.totalUsers.toLocaleString()}</div>
				<div class="text-sm text-muted-foreground">Active Traders</div>
			</div>
			<div class="text-center">
				<div class="mb-2 text-3xl font-bold text-purple-600">{formatMarketCap(stats.totalVolume)}</div>
				<div class="text-sm text-muted-foreground">24h Volume</div>
			</div>
			<div class="text-center">
				<div class="mb-2 text-3xl font-bold text-orange-600">{stats.activeTrades}</div>
				<div class="text-sm text-muted-foreground">Live Trades</div>
			</div>
		</div>
	</div>
</div>

<!-- Main Content -->
<div class="container mx-auto p-6">
	{#if loading}
		<HomeSkeleton />
	{:else if items.length === 0}
		<div class="flex h-96 items-center justify-center">
			<div class="text-center">
				<div class="mb-4 text-6xl">🎮</div>
				<div class="text-muted-foreground mb-4 text-xl">No items available yet</div>
				<p class="text-muted-foreground text-sm">Be the first to list an item!</p>
				{#if $USER_DATA}
					<Button class="mt-4" onclick={() => goto('/coin/create')}>
						<Coins class="mr-2 h-4 w-4" />
						Create Item
					</Button>
				{/if}
			</div>
		</div>
	{:else}
		<!-- Featured Items -->
		<div class="mb-12">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-3xl font-bold">Featured Items</h2>
				<Button variant="outline" onclick={() => goto('/market')}>
					View All
					<ArrowRight class="ml-2 h-4 w-4" />
				</Button>
			</div>
			
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each items.slice(0, 6) as item (item.symbol)}
					<a href={`/coin/${item.symbol}`} class="group block">
						<Card.Root class="h-full card-hover robux-glow">
							<Card.Header>
								<Card.Title class="flex items-center justify-between">
									<div class="flex items-center gap-3">
										<div class="relative">
											<CoinIcon icon={item.icon} symbol={item.symbol} name={item.name} size={8} />
											{#if item.change24h > 10}
												<Badge class="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0">
													<Star class="h-3 w-3" />
												</Badge>
											{/if}
										</div>
										<div>
											<div class="font-semibold">{item.name}</div>
											<div class="text-sm text-muted-foreground">*{item.symbol}</div>
										</div>
									</div>
									<Badge 
										variant={item.change24h >= 0 ? 'success' : 'destructive'} 
										class="ml-2 animate-pulse"
									>
										{item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
									</Badge>
								</Card.Title>
								<Card.Description>Total Value: {formatMarketCap(item.marketCap)}</Card.Description>
							</Card.Header>
							<Card.Content>
								<div class="flex items-baseline justify-between">
									<span class="text-3xl font-bold text-gradient-blue">{formatPrice(item.price)} R$</span>
									<span class="text-muted-foreground text-sm">
										24h Sales: {formatMarketCap(item.volume24h)}
									</span>
								</div>
								<div class="mt-4 flex items-center gap-2">
									<Zap class="h-4 w-4 text-yellow-500" />
									<span class="text-sm text-muted-foreground">Instant trading</span>
								</div>
							</Card.Content>
						</Card.Root>
					</a>
				{/each}
			</div>
		</div>

		<!-- Market Overview -->
		<div class="mb-12">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-3xl font-bold">Market Overview</h2>
				<div class="flex items-center gap-2">
					<Shield class="h-5 w-5 text-green-500" />
					<span class="text-sm text-muted-foreground">Secure Trading</span>
				</div>
			</div>
			<Card.Root class="overflow-hidden">
				<Card.Content class="p-0">
					<DataTable
						columns={marketColumns}
						data={items}
						onRowClick={(item) => goto(`/coin/${item.symbol}`)}
					/>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Features Section -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<Card.Root class="text-center">
				<Card.Content class="pt-6">
					<div class="mb-4 text-4xl">⚡</div>
					<h3 class="mb-2 text-xl font-semibold">Instant Trading</h3>
					<p class="text-muted-foreground">Trade items instantly with real Robux currency</p>
				</Card.Content>
			</Card.Root>
			
			<Card.Root class="text-center">
				<Card.Content class="pt-6">
					<div class="mb-4 text-4xl">🛡️</div>
					<h3 class="mb-2 text-xl font-semibold">Secure Platform</h3>
					<p class="text-muted-foreground">Your Robux and items are protected with advanced security</p>
				</Card.Content>
			</Card.Root>
			
			<Card.Root class="text-center">
				<Card.Content class="pt-6">
					<div class="mb-4 text-4xl">📈</div>
					<h3 class="mb-2 text-xl font-semibold">Live Analytics</h3>
					<p class="text-muted-foreground">Track prices and trends in real-time</p>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}
</div>

<style>
	/* Add smooth animations */
	:global(.group:hover .group-hover\:animate-bounce) {
		animation: bounce 1s infinite;
	}
	
	:global(@keyframes bounce) {
		0%, 100% {
			transform: translateY(-25%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: translateY(0);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}
</style>
