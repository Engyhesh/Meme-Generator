
const input = document.querySelector("input");
const btn = document.querySelector("button");
const mainDiv = document.querySelector(".mainDiv");

let memes = [];


async function loadMemes() {
    try {
        btn.disabled = true;
        btn.textContent = "Loading...";

        const response = await fetch(
            "https://api.imgflip.com/get_memes"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch memes");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error("The API returned an error");
        }

        memes = data.data.memes;

        btn.disabled = false;
        btn.textContent = "Show Meme";

    } catch (error) {
        mainDiv.innerHTML = `
            <h1 class="text-danger">
                Failed to load memes. Please try again.
            </h1>
        `;

        console.error(error);
        btn.disabled = true;
    }
}


btn.addEventListener("click", () => {

    const num = Number(input.value);

    mainDiv.innerHTML = "";

    if (
        input.value.trim() === "" ||
        !Number.isInteger(num) ||
        num < 0 ||
        num > 99
    ) {
        mainDiv.innerHTML = `
            <h1 class="text-danger">
                Please enter a valid number from 0 to 99.
            </h1>
        `;
        return;
    }

    const meme = memes[num];

    if (meme) {
        const content = `
            <h1 class="text-warning">${meme.name}</h1>

            <img
                src="${meme.url}"
                alt="${meme.name}"
                class="w-25 h-25"
                decoding="async"
            >
        `;

        mainDiv.innerHTML = content;

    } else {
        mainDiv.innerHTML = `
            <h1 class="text-danger">Meme not found.</h1>
        `;
    }

    input.value = "";
});


loadMemes();
