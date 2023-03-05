await item.use();
if (token.data.light.dim === 0) {
    await token.document.update({
        light: {
            alpha: 0.4,
            angle: 0,
            bright: 20,
            coloration: 1,
            dim: 40,
            gradual: true,
            luminosity: 0.5,
            saturation: 0,
            contrast: 0.25,
            shadows: 0,
            animation: {
                speed: 1,
                intensity: 2,
                reverse: false,
                type: "torch",
            },
            darkness: {
                min: 0,
                max: 1,
            },
            color: "#ff9b00",
        },
    });
} else {
    await token.document.update({
        light: {
            alpha: 0.5,
            angle: 0,
            bright: 0,
            color: "#000000",
            coloration: 1,
            dim: 0,
            gradual: true,
            luminosity: 0.5,
            saturation: 0,
            contrast: 0,
            shadows: 0,
            animation: {
                speed: 5,
                intensity: 5,
                reverse: false,
            },
            darkness: {
                min: 0,
                max: 1,
            },
        },
    });
}