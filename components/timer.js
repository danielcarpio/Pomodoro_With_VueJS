app.component('timer', {
    template: 
    `
    <div id='timer'>
        <div class='selector'>
            <p :class="{selected : selected == 'POMODORO'}" @click="changeBreak('POMODORO')" >POMODORO</p>
            <p :class="{selected : selected == 'SHORT_BREAK'}" @click="changeBreak('SHORT_BREAK')">SHORT BREAK</p>
            <p :class="{selected : selected == 'LONG_BREAK'}" @click="changeBreak('LONG_BREAK')">LONG BREAK</p>
        </div>
        <div class='display'>
            {{minutesRemain}}:{{secondsRemain}}
        </div>
        <div class='controls'>
            <p :class="{selected : status == 'RUNNING'}" @click="changeStatus('RUNNING')">Play</p>
            <p :class="{selected : status == 'PAUSED'}" @click="changeStatus('PAUSED')">Pause</p>
            <p :class="{selected : status == 'STOPPED'}" @click="changeStatus('STOPPED')">Stop</p>
        </div>
    </div>
    `,
    data(){
        return {
            eventInterval: null,
            timeRunning: 0,
            status: 'STOPPED', /* | RUNNING | PAUSED  */
            selected: 'POMODORO', /* | SHORT_BREAK | LONG_BREAK*/
            workingTime: 25*60*10,
            shortBreak: 5*60*10,
            longBreak: 15*60*10
        }
    },
    methods: {
        changeBreak(newBreak){
            if(this.selected != newBreak){
                this.selected = newBreak;
                this.changeStatus('STOPPED');
            }
        },
        changeStatus(newStatus){
            if(this.status != newStatus){
                this.status = newStatus;
                
                
                if(newStatus == 'RUNNING'){
                    this.eventInterval = setInterval(()=>{
                        document.title = this.minutesRemain+':'+this.secondsRemain + ' - Pomodoro Timer';
                        this.timeRunning++;

                        if(this.timeRemain == 0){
                            this.changeStatus('STOPPED');
                            window.alert('POMODORO ENDED!!!')
                        }
                    }, 100);
                } else if(newStatus == 'PAUSED'){
                    clearInterval(this.eventInterval);
                    this.eventInterval = null;
                }else {
                    document.title = 'Pomodoro Timer';
                    this.timeRunning = 0;
                    clearInterval(this.eventInterval);
                    this.eventInterval = null;
                }
            }
        }
    },
    computed: {
        timeRemain(){
            switch (this.selected) {
                case 'POMODORO':
                    return this.workingTime - this.timeRunning;
                case 'SHORT_BREAK':
                    return this.shortBreak - this.timeRunning;
                case 'LONG_BREAK':
                    return this.longBreak - this.timeRunning;
            }
        },
        minutesRemain(){
            return parseInt(this.timeRemain / 600);
        },
        secondsRemain(){
            const tmp = parseInt((this.timeRemain - this.minutesRemain*600) / 10);
            if(tmp.toString().length > 1) return tmp.toString();
            else return '0'+tmp.toString();
        }
    }
});