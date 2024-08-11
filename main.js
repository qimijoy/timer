document.addEventListener('DOMContentLoaded', () => {
	new Timer({ selector: '#timer' });
})

class Timer {
	constructor({ selector }) {
		this.date = new Date();
		this.setZero();

		this.intervalValue = 5; // ms

		this.timerEl = document.querySelector(selector);

		this.init();
	}

	init() {
		const span = document.createElement('span');
		const div = document.createElement('div');
		const button = document.createElement('button');

		this.timerEl.classList.add('timer');

		this.timer_wrap = div.cloneNode();
		this.timer_wrap.classList.add('timer__digits');

		this.hours = span.cloneNode();
		this.hours.classList.add('timer__hours');
		this.mins = span.cloneNode();
		this.mins.classList.add('timer__mins');
		this.secs = span.cloneNode();
		this.secs.classList.add('timer__secs');
		this.msesc = span.cloneNode();
		this.msesc.classList.add('timer__msesc');
		this.timer_wrap.append(this.hours, this.mins, this.secs, this.msesc);

		this.timer_buttons_wrap = div.cloneNode();
		this.timer_buttons_wrap.classList.add('timer__buttons');
		this.button_start = button.cloneNode();
		this.button_start.classList.add('timer__button');
		this.button_start.textContent = 'Start';
		this.button_start.addEventListener('click', () => {
			this.start();
			this.timerEl.classList.remove('stopped');
		});
		this.timer_buttons_wrap.append(this.button_start);

		this.button_pause = button.cloneNode();
		this.button_pause.classList.add('timer__button');
		this.button_pause.textContent = 'Pause';
		this.button_pause.addEventListener('click', () => {
			this.pause();
			this.timerEl.classList.add('stopped');
		});
		this.timer_buttons_wrap.append(this.button_pause);

		this.button_reset = button.cloneNode();
		this.button_reset.classList.add('timer__button');
		this.button_reset.textContent = 'Reset';
		this.button_reset.addEventListener('click', () => {
			this.reset();
			this.timerEl.classList.add('stopped');
		});
		this.timer_buttons_wrap.append(this.button_reset);

		this.timerEl.append(this.timer_wrap, this.timer_buttons_wrap);

		this.timer = null;
		this.resetTime();
	}

	start() {
		if (this.timer) {
			clearInterval(this.timer);
		}

		this.updateTime()
		this.timer = setInterval(() => this.updateTime(), this.intervalValue);

		this.button_start.disabled = true;
		this.button_pause.disabled = false;
		this.button_reset.disabled = false;
	}

	pause() {
		clearInterval(this.timer);
		this.timer = null;

		this.button_start.disabled = false;
		this.button_pause.disabled = true;
		this.button_reset.disabled = false;
	}

	reset() {
		clearInterval(this.timer);
		this.timer = null;
		this.setZero();
		this.resetTime();

		this.button_start.disabled = false;
		this.button_pause.disabled = false;
		this.button_reset.disabled = true;
	}

	updateTime() {
		this.date.setTime(this.date.getTime() + this.intervalValue)
		this.drawTime();
	}

	resetTime() {
		this.date.setHours(0,0,0,0);
		this.drawTime();
	}

	drawTime() {
		this.hours.textContent = this.addZero(this.date.getHours(), 2) + ':';
		this.mins.textContent = this.addZero(this.date.getMinutes(), 2) + ':';
		this.secs.textContent = this.addZero(this.date.getSeconds(), 2) + ':';
		this.msesc.textContent = this.addZero(this.date.getMilliseconds(), 3);
	}

	addZero(value, digits) {
		if (digits === 2 || digits === 3) {
			switch (digits) {
				case 2:
					return value < 10 ? '0' + value : value;
				case 3:
					if (value < 10)
						return '00' + value
					else if (value >= 10 && value < 100)
						return '0' + value
					else
						return value
			}
		} else {
			return value;
		}
	}
}
