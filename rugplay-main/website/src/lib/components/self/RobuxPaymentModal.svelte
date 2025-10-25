<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { 
		CreditCard, 
		Shield, 
		Zap, 
		CheckCircle, 
		AlertCircle,
		Coins,
		ArrowRight
	} from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { USER_DATA } from '$lib/stores/user-data';

	let { open = $bindable(false) } = $props<{ open?: boolean }>();
	
	let amount = $state(0);
	let paymentMethod = $state('card');
	let processing = $state(false);
	let step = $state(1); // 1: Amount, 2: Payment, 3: Confirmation

	const paymentMethods = [
		{ id: 'card', name: 'Credit/Debit Card', icon: CreditCard, fee: 0 },
		{ id: 'paypal', name: 'PayPal', icon: CreditCard, fee: 2.9 },
		{ id: 'apple', name: 'Apple Pay', icon: CreditCard, fee: 0 },
		{ id: 'google', name: 'Google Pay', icon: CreditCard, fee: 0 }
	];

	function calculateTotal() {
		const method = paymentMethods.find(m => m.id === paymentMethod);
		const fee = method ? (amount * method.fee / 100) : 0;
		return amount + fee;
	}

	function handleNext() {
		if (step === 1) {
			if (amount < 1) {
				toast.error('Minimum amount is 1 Robux');
				return;
			}
			if (amount > 10000) {
				toast.error('Maximum amount is 10,000 Robux');
				return;
			}
			step = 2;
		} else if (step === 2) {
			step = 3;
			processPayment();
		}
	}

	function handleBack() {
		if (step > 1) {
			step--;
		}
	}

	async function processPayment() {
		processing = true;
		
		try {
			// Simulate payment processing
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// Here you would integrate with actual payment processor
			// For now, we'll simulate success
			toast.success(`Successfully purchased ${amount} Robux!`);
			
			// Close dialog after success
			setTimeout(() => {
				open = false;
				step = 1;
				amount = 0;
				processing = false;
			}, 1500);
			
		} catch (error) {
			toast.error('Payment failed. Please try again.');
			processing = false;
		}
	}

	function resetDialog() {
		step = 1;
		amount = 0;
		paymentMethod = 'card';
		processing = false;
	}
</script>

<Dialog.Root bind:open onOpenChange={(isOpen) => !isOpen && resetDialog()}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2">
				<Coins class="h-5 w-5 text-blue-600" />
				Buy Robux
			</Dialog.Title>
			<Dialog.Description>
				Purchase Robux to trade virtual items on our platform
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-6">
			{#if step === 1}
				<!-- Amount Selection -->
				<div class="space-y-4">
					<div>
						<Label for="amount">Amount (Robux)</Label>
						<Input
							id="amount"
							type="number"
							min="1"
							max="10000"
							bind:value={amount}
							placeholder="Enter amount"
							class="text-lg"
						/>
					</div>
					
					<div class="grid grid-cols-3 gap-2">
						{#each [100, 500, 1000, 2500, 5000, 10000] as preset}
							<Button
								variant={amount === preset ? 'default' : 'outline'}
								size="sm"
								onclick={() => amount = preset}
							>
								{preset}
							</Button>
						{/each}
					</div>
				</div>
			{:else if step === 2}
				<!-- Payment Method Selection -->
				<div class="space-y-4">
					<div>
						<Label>Payment Method</Label>
						<div class="space-y-2">
							{#each paymentMethods as method}
								<Card.Root 
									class="cursor-pointer transition-colors hover:bg-muted/50 {paymentMethod === method.id ? 'ring-2 ring-blue-500' : ''}"
									onclick={() => paymentMethod = method.id}
								>
									<Card.Content class="flex items-center justify-between p-3">
										<div class="flex items-center gap-3">
											<method.icon class="h-5 w-5" />
											<span class="font-medium">{method.name}</span>
										</div>
										{#if method.fee > 0}
											<Badge variant="outline">{method.fee}% fee</Badge>
										{:else}
											<Badge variant="secondary">No fee</Badge>
										{/if}
									</Card.Content>
								</Card.Root>
							{/each}
						</div>
					</div>
				</div>
			{:else if step === 3}
				<!-- Confirmation -->
				<div class="space-y-4">
					{#if processing}
						<div class="text-center py-8">
							<div class="mb-4 text-4xl">⏳</div>
							<h3 class="text-lg font-semibold">Processing Payment</h3>
							<p class="text-muted-foreground">Please wait while we process your payment...</p>
						</div>
					{:else}
						<div class="text-center py-8">
							<div class="mb-4 text-4xl">✅</div>
							<h3 class="text-lg font-semibold">Payment Successful!</h3>
							<p class="text-muted-foreground">Your Robux will be added to your account shortly.</p>
						</div>
					{/if}
				</div>
			{/if}

			<!-- Summary -->
			{#if step >= 2 && !processing}
				<Card.Root>
					<Card.Content class="p-4">
						<h4 class="font-semibold mb-3">Order Summary</h4>
						<div class="space-y-2 text-sm">
							<div class="flex justify-between">
								<span>Robux Amount:</span>
								<span class="font-medium">{amount} R$</span>
							</div>
							{#if paymentMethods.find(m => m.id === paymentMethod)?.fee > 0}
								<div class="flex justify-between">
									<span>Processing Fee:</span>
									<span class="font-medium">${(amount * paymentMethods.find(m => m.id === paymentMethod)!.fee / 100).toFixed(2)}</span>
								</div>
							{/if}
							<Separator />
							<div class="flex justify-between font-semibold">
								<span>Total:</span>
								<span>${calculateTotal().toFixed(2)}</span>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			{/if}
		</div>

		<Dialog.Footer class="flex gap-2">
			{#if step > 1 && !processing}
				<Button variant="outline" onclick={handleBack}>
					Back
				</Button>
			{/if}
			
			{#if step < 3 && !processing}
				<Button onclick={handleNext} class="flex-1">
					{#if step === 1}
						Continue
					{:else if step === 2}
						Pay ${calculateTotal().toFixed(2)}
					{/if}
					<ArrowRight class="ml-2 h-4 w-4" />
				</Button>
			{/if}
		</Dialog.Footer>

		<!-- Security Notice -->
		<div class="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
			<Shield class="h-4 w-4 text-green-600" />
			<span class="text-sm text-green-700 dark:text-green-300">
				Your payment is secured with 256-bit SSL encryption
			</span>
		</div>
	</Dialog.Content>
</Dialog.Root>
