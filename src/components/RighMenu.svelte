<script>
	import Icon from '@iconify/svelte';
	import tooltip from '$utils/tooltip';
	$: collapsed = true;
	const icons = {
		// 'equalizer-1': 'ph:equalizer-bold',
		// 'equalizer-2': 'mdi:equalizer',
		// 'equalizer-3': 'icon-park-outline:equalizer',
		// 'list-view': 'dashicons:list-view',
		'grid-view': 'dashicons:grid-view',
		calculator: 'ant-design:calculator-filled',
		worksheets: 'ic:baseline-view-comfy',
		'arrow-left': 'bxs:arrow-to-left',
		'arrow-right': 'bxs:arrow-to-right',
		delete: 'fluent:delete-dismiss-24-filled',
		info: 'akar-icons:info-fill',
		sheets: 'material-symbols:sheets-outline',
		addSheet: 'material-symbols:sheets-add-on',
		settings: 'ci:settings-filled'
	};
</script>

<div
	class="mt-12 top-12 mr-4 opacity-0 transition-all duration-300 text-3xl flex flex-col items-center justify-start
{collapsed ? 'opacity-100' : ''}"
>
	<div class="tooltip my-2" use:tooltip title="Saved worksheets">
		<Icon icon={icons.sheets} class=" " />
	</div>
	<div class="tooltip my-2" use:tooltip title="New worksheet">
		<Icon icon={icons.addSheet} class=" " />
	</div>
	<div class="tooltip my-2 self-end justify-self-end" use:tooltip title="Worksheet settings">
		<Icon icon={icons.settings} class=" " />
	</div>
</div>
