const textElement = document.querySelector('#text');
const btnsElement = document.querySelector('#option-buttons');

let state = {};

function startGame() {
	state = {};
	showTextNode(1);
}

function showTextNode(textNodeIndex){
	const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
	textElement.innerText = textNode.text;
	while (btnsElement.firstChild){
		btnsElement.removeChild(btnsElement.firstChild)
	}

	textNode.options.forEach(option =>{
		if (showOption(option)) {
			const button = document.createElement('button')
			button.innerText = option.text;
			button.classList.add('btn');
			button.addEventListener('click', () => selectOption(option));
			btnsElement.appendChild(button);
		}
	})
}

function showOption(option) {
	return option.requiredState == null || option.requiredSteate(state);
}

function selectOption(option){
	const nextTextNodeId = option.nextText;

	if (nextTextNodeId <= 0) {
		return startGame();
	}

	state = Object.assign(state, option.setState);
	showTextNode(nextTextNodeId);
}

const textNodes = [
	{
		id: 1,
		text: 'Are the lights for the router on?',
		options: [
			{
				text: 'Yes',
				setState: { routerLights: true},
				nextText: 2
			},
			{
				text: 'No',
				nextText: 3
			}
		]
	},
	{
		id: 2,
		text: 'Reboot the router. Did all the lights come back Green?',
		options: [
			{
				text: 'Yes',
				nextText: 5
			},
			{
				text: 'No',
				nextText: 6
			}
		]
	},
	{
		id: 3,
		text: 'Check the power. Did the lights come on after checking the power?',
		options: [
			{
				text: 'Yes',
				nextText: 2
			},
			{
				text: 'No',
				nextText: 4
			}
		]
	},
	{
		id: 4,
		text: 'Likely not an internet issue. Treat this as a power issue, or potentially failed equipment, and troubleshoot that.',
		options: [{ text: 'Restart', nextText: -1}]
	},
	{
		id: 5,
		text: 'Is the system reporting as online now?',
		options: [
			{
				text: 'Yes',
				nextText: 7
			},
			{
				text: 'No',
				nextText: 8
			}
		]
	},
	{
		id: 6,
		text: 'Is the power light orange?',
		options: [
			{
				text: 'Yes',
				nextText: 9
			},
			{
				text: 'No',
				nextText: 10
			}
		]
	},
	{
		id: 7,
		text: 'You did it!!!',
		options: [{ text: 'Restart', nextText: -1}]
	},
	{
		id: 8,
		text: 'Have property reboot the ISP modem. Did that bring the system Online?',
		options: [
			{
				text: 'Yes',
				nextText: 7
			},
			{
				text: 'No',
				nextText: 11
			}
		]
	},
	{
		id: 9,
		text: "This is an issue with the router. If you have a tech on the line, or a helpful property manager, you can factory reset the router, and reconfigure it by following instructions [here]. If that doesn't work, or they don't have a laptop, send a new router. Fulfillment will send on that has been configured.",
		options: [{ text: 'Restart', nextText: -1 }]
	},
	{
		id: 10,
		text: 'Is the middle light on?',
		options: [
			{
				text: 'Yes',
				nextText: 12,
			},
			{
				text: 'No',
				nextText: 13,
			}
		]
	},
	{
		id: 11,
		text: 'Have them reboot our router again. Did that bring the system online?',
		options: [
			{
				text: 'Yes',
				nextText: 7
			},
			{
				text: 'No',
				nextText: 14
			}
		]
	},
	{
		id: 12,
		text: 'Is the middle light green?',
		options: [
			{
				text: 'Yes',
				nextText: 15,
			},
			{
				text: 'No',
				nextText: 16
			}
		]
	},
	{
		id: 13,
		text: 'A blank middle light indicates the router is not plugged into a network. Make sure incoming internet line is plugged into the correct port. If it is, likely there is a cable unplugged somewhere between the router and the their modem. Local Maintenance, IT, or a tech from their service provider will need to check the wall port for activity, and trace the line back on their network until they find where it was discconected.',
		options: [{ text: 'Restart', nextText: -1 }]
	},
	{
		id: 14,
		text: "The property will need to reach out to their service provider. They can tell their provider that we use DHCP but can't get to the internet from any device on our router. Have the provider check to see if our Netgear router shows on the network, ask them if the modem is in bridge mode, and find out if there are any special settings we need to connect through their system (like a static IP address). Let them know they can call in with the ISP to work with us to find the settings. ",
		options: [{ text: 'Restart', nextText: -1 }]
	},
	{
		id: 15,
		text: 'Does the system show online?',
		options: [
			{
				text: 'Yes',
				nextText: 7,
			},
			{
				text: 'No',
				nextText: 14
			}
		]
	},
	{
		id: 16,
		text: "Likely, that light is orange. This indicates that our router knows it is connected to another network device, but it is not getting an IP address that will allow it onto the internet. They  will need to reach out to their service provider. They can tell their provider they have a Netgear router that will not connect to their service, and ask them to reboot the netwokr from their side. Make sure they tell the provider we use DHCP, in case that doesn't work with their setup.",
		options: [{ text: 'Restart', nextText: -1 }]
	}

]

startGame();
