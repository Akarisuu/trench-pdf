<script lang="ts">
	import camelcaseKeys from 'camelcase-keys';

	import CheckboxField from '$lib/components/checkboxField/checkboxField.svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as m from '$lib/i18n/messages';
	import { validCompendiumSchema, type ValidCompendiumData } from '$lib/schemas/compendium';

	import { generatePDF } from '../_utils/pdf';

	type Props = {
		mainSheetWrapperRef: HTMLElement | undefined;
		weaponsWrapperRef: HTMLElement | undefined;
		files: FileList | undefined;
		fileData: ValidCompendiumData | undefined;
		separateWeapons: boolean;
	};

	let {
		mainSheetWrapperRef = $bindable(),
		weaponsWrapperRef = $bindable(),
		files = $bindable(),
		fileData = $bindable(),
		separateWeapons = $bindable()
	}: Props = $props();

	let fileError = $state<string>();

	const handleClick = () => {
		if (!mainSheetWrapperRef) return;
		generatePDF({
			mainSheetWrapperRef,
			weaponsWrapperRef,
			rosterName: fileData?.name ?? fileData?.faction.name
		});
	};

	const handleReaderLoad = (e: ProgressEvent<FileReader>) => {
		if (typeof e.target?.result !== 'string') return;
		const data = JSON.parse(e.target.result || 'null');
		const { data: parsedData, success } = validCompendiumSchema.safeParse(
			camelcaseKeys(data, { deep: true })
		);

		if (!success) {
			fileError = m.home_formError_invalidData();
			return;
		}

		fileError = undefined;
		fileData = parsedData;
	};

	$effect(() => {
		if (!files?.length) return;
		const file = Array.from(files)[0];
		const reader = new FileReader();
		reader.onload = handleReaderLoad;
		reader.readAsText(file);
	});
</script>

<div class={'flex w-full max-w-lg flex-col items-start gap-4 md:pt-8'}>
	<div class="flex flex-col gap-1">
		<Label for="source" class={[!!fileError && 'text-yellow-600']}
			>{m.home_input_file_label()}</Label
		>
		<Input
			id="source"
			type="file"
			class={[fileError && 'border-yellow-600 text-yellow-600']}
			bind:files
			accept="application/JSON"
		/>

		{#if fileError}
			<p class="text-sm text-yellow-600">{fileError}</p>
		{:else}
			<p class="text-sm text-muted-foreground">
				{m.home_input_file_helperText()}
				<a href="https://trenchcompendium.netlify.app/tools/warband/" target="_blank"
					>{m.home_builder_name()}
				</a>
			</p>
		{/if}
	</div>
	<CheckboxField
		id="separate-weapons"
		bind:checked={separateWeapons}
		disabled={!!fileError}
		label={m.home_input_separateWeapons()}
	/>
	<Button disabled={!!fileError || !mainSheetWrapperRef} onclick={handleClick} class="mt-4"
		>{m.home_input_submit()}</Button
	>
</div>
