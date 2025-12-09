class AudioController {
    constructor() {
        this.volume = 0.75;
        this.bgdMusicFactor = 0.65;
        this.clickSoundFactor = 0.9;
        this.deathSoundFactor = 1;
        this.powerUpSoundFactor = 1;
    }

    init() {
        if(this.bgdMusic == undefined) {
            this.bgdMusic = loadSound("assets/audio/BackgroundMusic.mp3", _ => {this.bgdMusic.loop(); this.bgdMusic.setVolume(this.volume*this.bgdMusicFactor);});
        }
        if(this.clickSound == undefined) {
            this.clickSound = loadSound("assets/audio/ClickSound.mp3", _ => {this.clickSound.setVolume(this.volume*this.clickSoundFactor);});
        }
        if(this.deathSound == undefined) {
            this.deathSound = loadSound("assets/audio/DeathSound.mp3", _ => {this.deathSound.setVolume(this.volume*this.deathSoundFactor);});
        }
        if(this.powerUpSound == undefined) {
            this.powerUpSound = loadSound("assets/audio/PowerUp.mp3", _ => {this.powerUpSound.setVolume(this.volume*this.powerUpSoundFactor);});
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

    playDeathSound() {
        if(this.deathSound.isLoaded) {
            this.deathSound.setVolume(this.volume*this.deathSoundFactor);
            this.deathSound.play();
        } else {
            console.warn("death sound tried to play but wasn't loaded!");
        }
    }

    playPowerUpSound() {
        if(this.powerUpSound.isLoaded) {
            this.powerUpSound.setVolume(this.volume*this.powerUpSoundFactor);
            this.powerUpSound.play();
        } else {
            console.warn("power up sound tried to play but wasn't loaded!");
        }
    }

}