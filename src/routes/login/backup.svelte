<form >
    <div class=" w-full mb-1 flex flex-col tooltip items-center justify-between">
        <label
            for="email"
            use:tooltip
            class="w-full border-2 border-fuchsia-500"
            title="Sign in via magic link with just your email address."
            ><input
                type="text"
                name="email"
                bind:value={email}
                autocomplete="on"
                placeholder="Email address"
                class=" outline-none w-full bg-transparent border-transparent border-b-1 border-b-winterblues-700 p-2 focus:ring-0 focus:border-transparent focus:border-b-winterblues-500 active:outline-none active:border-none"
            />
        </label>
        <ul>
            <li>	<label for="showAnswers" class="flex items-center"
                >Option One: 
                
                <Checkbox
                    name="showAnswers"
                    bind:checked={option1}
                    class=" m-4 bg-winterblues-500 bg-opacity-50"
                />{option1}
            </label></li>
            <li>	<label for="showAnswers" class="flex items-center"
                >Option One: 
                
                <Checkbox
                    name="showAnswers"
                    bind:checked={option1}
                    class=" m-4 bg-winterblues-500 bg-opacity-50"
                />{option1}
            </label></li>
        </ul>
        <button
            class="w-full p-2 bg-winterblues-700"
            type="submit"
            on:click|preventDefault={() => handleSubmit('magic')}>Continue</button
        >
    </div>
</form>