class AudioController {
    constructor() {
        this.volume = 0.75;
        this.bgdMusicFactor = 0.85;
        this.clickSoundFactor = 1;
    }

    init() {
        if(this.bgdMusic == undefined) {
            this.bgdMusic = loadSound("assets/audio/BackgroundMusic.mp3", _ => {this.bgdMusic.loop(); this.bgdMusic.setVolume(this.volume*this.bgdMusicFactor);});
        }
        if(this.clickSound == undefined) {
            this.clickSound = loadSound("assets/audio/ClickSound.mp3", _ => {this.clickSound.volume = this.volume*this.clickSoundFactor;});
        }
    }

    update() {
        if(!this.bgdMusic.isPlaying() && this.bgdMusic.isLoaded()) {
            this.bgdMusic.setVolume(this.volume*this.bgdMusicFactor);
            this.bgdMusic.play();
        }
    }

    changeVolume(vol) {
        this.volume = vol;
        this.bgdMusic.setVolume(vol*this.bgdMusicFactor);
    }

    playClickSound() {
        if(this.clickSound.isLoaded) {
            this.clickSound.setVolume(this.volume*this.clickSoundFactor);
            this.clickSound.play();
        } else {
            console.warn("click sound tried to play but wasn't loaded!");
        }
    }

}