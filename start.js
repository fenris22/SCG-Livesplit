const rs = GetRootScope();
let _modPath;

const socket = new WebSocket('ws://localhost:16834/livesplit')

exports.initialize = (modPath) => {
    _modPath = modPath;
    rs.$on(Enums.GameEvents.ProductMilestoneCompleted, function (event, args) {
	socket.send('split')
	Helpers.ConsoleInfo('milestone-completed')
    })


    socket.onopen = () => {
        Helpers.ConsoleInfo('Connected to livesplit.')
    }
    socket.onclose = () => {
        Helpers.ConsoleInfo('Lost connection to livesplit!')
    }
    socket.onerror = (e) => {
        Helpers.ConsoleInfo('Something went horribly wrong!', e)
    }
};

exports.onLoadGame  = start => {
    Helpers.ConsoleInfo('game-started') 
    socket.send('starttimer')
};
