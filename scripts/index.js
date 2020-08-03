const random = (max) => {
    return Math.random()*max
}

document.body.style.setProperty("--bg-color", `rgba(${random(255)}, ${random(255)}, ${random(255)}, 1)`);
document.body.style.setProperty("--txt-color", `rgba(${random(255)}, ${random(255)}, ${random(255)}, 1)`);

const pickr = Pickr.create({
    el: '#color-picker-btn',
    theme: 'monolith',
    useAsButton: true,
    showAlways: true,
    container: '#color-picker',
    // autoReposition: false,
    default: document.body.style.getPropertyValue("--txt-color"),
    components: {

        // Main components
        preview: false,
        opacity: false,
        hue: true,

        // Input / output Options
        interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            // hsva: true,
            // cmyk: true,
            input: false,
            clear: false,
            save: false
        }
    }
});

pickr.on('change', (color, instance) => {
    document.body.style.setProperty("--txt-color", color.toRGBA());
})

const exportBtn = document.getElementById("export-btn");
const nextBtn = document.getElementById("next-btn");
const dataSetLengthMeter = document.getElementById("dataSetLengthMeter");

let dataSet = [];

nextBtn.addEventListener("click", () => {
    dataSet.push({
        background: document.body.style.getPropertyValue("--bg-color"),
        color: document.body.style.getPropertyValue("--txt-color")
    })
    dataSetLengthMeter.innerText = `Samples: ${dataSet.length}`;
    document.body.style.setProperty("--bg-color", `rgba(${random(255)}, ${random(255)}, ${random(255)}, 1)`);
})

exportBtn.addEventListener("click", () => {
    downloader.href = URL.createObjectURL(new Blob([JSON.stringify(dataSet)]));
    downloader.download = `color-dataset-${dataSet.length}-${Date.now()}.json`;
    downloader.click();
    dataSet = [];
    dataSetLengthMeter.innerText = `Samples: 0`;
})

const downloader = document.createElement("a")