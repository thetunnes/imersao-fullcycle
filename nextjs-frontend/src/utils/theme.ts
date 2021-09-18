import { red, grey } from '@material-ui/core/colors'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import { createTheme } from '@material-ui/core'

const palette: PaletteOptions = {
    type: "dark",
    primary: {
        main: red[800],
        contrastText: grey[50],
    },
    background: {
        default: "#242526",
    },
};

const theme = createTheme({
    palette,
});

export default theme;