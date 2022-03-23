<script>
	import Icon from '@iconify/svelte';

	let operations = [
		{
			name: 'Multiply',
			symbol: '*',
			iconname: 'fa-times'
		},
		{
			name: 'Subtract',
			symbol: '-',
			iconname: 'fa-minus'
		},
		{
			name: 'Add',
			symbol: '+',
			iconname: 'fa-plus'
		},
		{
			name: 'Divide',
			symbol: '/',
			iconname: 'fa-divide'
		}
	];
    $: selectedOperation = operations[0];
	function setOperationByKey() {
		switch (this.keyCode) {
			case 13:
				return (toggle.checked = true);
			case 37:
				return this.operations[1]; // this.selectedOperation = "Subtract";
				break;
			case 38:
				return this.operations[0]; // this.selectedOperation = "Multiply";
				break;
			case 39:
				return this.operations[2]; // this.selectedOperation = "Add";
				break;
			case 40:
				return this.operations[3]; // this.selectedOperation = "Divide";
				break;
			case 9:
				if (this.selectedOperation != '') {
					return this.selectedOperation;
				} else {
					return this.operations[0];
				}
			default:
				return this.selectedOperation;
		}
	}

	function setOperationByKeyDown(e) {
		console.log(`🚀 ~ file: RadialMenu.svelte ~ line 54 ~ setOperationByKeyDown ~ e`, e);
		let toggle = document.getElementById('toggle');
		let keyCode = e.keyCode;
		console.log(e.keyCode, toggle.checked);
		toggle.checked = false;

	}

	function operationSelect(operation) {
		console.log(`🚀 ~ file: RadialMenu.svelte ~ line 52 ~ operationSelect ~ operation`, operation);
	}
</script>

<input type="checkbox" id="operationSelect" />

<div
	class="radial-menu-container"
	id="radial-menu"
	tabindex="0"
	on:keydown={(e) => setOperationByKeyDown(e)}
>
	<div class="menu">
		<input type="checkbox" id="toggle" />
		<label id="show-menu" for="toggle">
			<div class="btn">
                {#if selectedOperation = ""}
				<Icon
					bind:value="{selectedOperation}"
					class="toggleBtn fas {selectedOperation.iconname}"
					id="closeBtn"
				/>
                {:else}
				<Icon
					bind:value="{selectedOperation}"
					class="fas toggleBtn active {selectedOperation.iconname}"

					id="menuBtn"
				/>
                {/if}
			</div>
			{#each operations as operation}
				<div class="btn" on:click={() => operationSelect(operation)} />
				<!-- <i class="fas" :class="operation.iconname" v-model="selectedOperation"></i> -->
				<Icon icon={operation.iconname} />
			{/each}
		</label>
	</div>
</div>

<style lang="scss">
	i {
		background: none;
	}

	.active {
		color: #ffab00;
	}

	.label-image {
		line-height: 0;
	}

	.input-hidden {
		position: absolute;
		display: none;
		z-index: 4;
	}

	/* input[type=radio]:checked + label>img {
  border: 5px solid #fff;
  box-shadow: 0 0 3px 3px #090;
} */

	/* input[type="radio"] {
  appearance: none;
  margin: 0;
  padding: 0;
} */

	.radial-menu-container {
		margin: 0 1em;
	}

	body {
		overflow: hidden;
		background: #212121;
	}

	input {
		position: absolute;
		display: none;
	}

	* {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.menu {
		margin: 0 auto;
		position: absolute;
		/* top: 50%;
  left: 50%; */
		margin-left: -13px;
		margin-top: -3px;
	}

	.btn {
		width: 28px;
		height: 28px;
		border-radius: 28px;
		position: absolute;
		overflow: hidden;
		cursor: pointer;
		background: none;
	}

	.btn:first-child:hover {
		box-shadow: 0px 0px 3px rgba(255, 120, 0, 1);
	}

	.btn {
		/* background: #333; */

		font-size: 15px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		box-shadow: 0px 0px 3px rgba(0, 161, 255, 1);
		-webkit-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		z-index: 3;

		&:hover {
			box-shadow: 0px 0px 3px rgba(255, 120, 0, 1);
		}
	}

	.btn:not(:first-child) {
		opacity: 0;
		background: none;
		-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
		z-index: 2;
		-webkit-transition: all 0.3s cubic-bezier(0.87, -0.41, 0.19, 1.44);
		transition: all 0.3s cubic-bezier(0.87, -0.41, 0.19, 1.44);
		-webkit-transition-delay: 0.1s;
		transition-delay: 0.1s;
		box-shadow: 0px 0px 2px rgba(0, 161, 255, 1);
	}

	.btn:not(:first-child):hover {
		box-shadow: 0px 0px 3px rgba(255, 120, 0, 1);
		transition: all 0s;
		-webkit-transition: 0s;
		-webkit-transition-delay: 0s;
		transition-delay: 0s;
		color: #ffab00;
	}

	input#toggle:checked ~ #show-menu .btn:nth-child(1) {
		background: #000;
		transform: scale(3.5);
		border: 0.5px solid black;
		color: black;
		font-size: 0px;
		opacity: 0.9;
		/* left: -2px;
  top: -1px; */
		z-index: 2;
		/* box-shadow: none; */
		-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
	}

	/* i#menuBtn.fas.active {
  color: rgba(0, 0, 0, 0);
} */

	input#toggle:checked ~ #show-menu .btn:nth-child(2) {
		top: -28px;

		opacity: 1;
		-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
	}

	input#toggle:checked ~ #show-menu .btn:nth-child(3) {
		left: -28px;

		opacity: 1;
		-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
	}

	input#toggle:checked ~ #show-menu .btn:nth-child(4) {
		left: 28px;

		opacity: 1;
		-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
	}

	input#toggle:checked ~ #show-menu .btn:nth-child(5) {
		top: 28px;

		opacity: 1;
		-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
	}

	.menuBtn,
	.closeBtn {
		position: absolute;
		transition: all 0.3s ease;
	}

	.closeBtn {
		transform: translateY(28px);
		opacity: 0;
	}

	input#toggle:checked ~ #show-menu .btn .menuBtn {
		transform: translateY(-28px);
		opacity: 0;
	}

	input#toggle:checked ~ #show-menu .btn .closeBtn {
		transform: translateY(0px);
		opacity: 1;
	}
</style>
