import Component from "js/component";

class PaletteSelector implements Component {
  key: string;

  run() {
    this.key = 'hbs-palette';
    this.initPalette();
  }

  initPalette() {
    const palette = this.getPalette();
    if (palette) {
      this.setPalette(palette);
    }
    const selected = this.getPalette();
    const self = this;
    document.querySelectorAll('.palette').forEach((element) => {
      const paletteId = element.getAttribute('id').replace('palette-', '');
      if (paletteId === selected) {
        element.classList.add('active');
      }
      element.addEventListener('click', () => {
        self.setPalette(paletteId);
        document.querySelector('.palette.active').classList.remove('active');
        element.classList.add('active');
      });
    });
  }

  getPalette(): string {
    const palette = localStorage.getItem(this.key);
    if (palette) {
      return palette;
    }

    const paletteMeta = document.body.parentElement.getAttribute('data-palette');
    if (paletteMeta) {
      return paletteMeta;
    }

    return '';
  }

  setPalette(palette: string) {
    console.debug(`switch to palette: ${palette}`);
    document.body.parentElement.setAttribute('data-palette', palette);
    localStorage.setItem(this.key, palette);
  }
}

export default PaletteSelector;
