import BiggerPicture from '../bigger-picture'
import Firewatch from './components/firewatch.svelte'
import Dialog from './components/dialog.svelte'
import BiggerPictureThumbnails from './bp-thumbnails.svelte'
import { listen, self } from 'svelte/internal'
import FlexMasonry from 'flexmasonry/src/flexmasonry.js'

// import hideShowScroll from 'hide-show-scroll'
// import Prism from 'prismjs'
import plausible from './plausible'

let bodyBp, inlineBp, bpThumbnails

let { body } = document

let imageLinks = document.querySelectorAll('#images a')
let vidIframeLinks = document.querySelectorAll('#vids a')
let htmlLinks = document.querySelectorAll('[data-html]')
let captionLinks = document.querySelectorAll('#captions a')
let inlineWrap = document.getElementById('inline_gallery')
let firewatch = document.getElementById('firewatch')
let thumbnails = document.querySelectorAll('#thumbnails a')
let responsiveExample = document.querySelectorAll('#responsive_example')

function initBodyBp() {
	if (!bodyBp) {
		bodyBp = BiggerPicture({
			target: body,
		})
	}
}

function handleNodes(nodes) {
	for (let i = 0; i < nodes.length; i++) {
		nodes[i].addEventListener('click', openBiggerPicture.bind(null, nodes))
	}
}
function handleVids(nodes) {
	for (let i = 0; i < nodes.length; i++) {
		nodes[i].addEventListener('click', openBiggerPictureVids)
	}
}

function handleMasonry(sections) {
	FlexMasonry.init(sections, {
		breakpointCols: {
			'min-width: 801px': 3,
			'min-width: 0px': 2,
		},
	})
}

function openBiggerPicture(items, e) {
	e.preventDefault()
	initBodyBp()
	bodyBp.open({
		el: e.currentTarget,
		// position: 3,
		items,
		maxZoom: 4,
		// scale: 0.8,
		// noClose: true,
		// onOpen: (container) => {
		// console.log('container', container)
		// container.classList.add('example')
		// },
		// onUpdate(container, activeItem) {
		// 	console.log('container', container)
		// 	console.log('activeItem', activeItem)
		// },
		// onOpen: hideShowScroll.hide,
		// onClosed: hideShowScroll.show,
	})
}
function openBiggerPictureVids(e) {
	e.preventDefault()
	initBodyBp()
	let { currentTarget } = e
	bodyBp.open({
		el: currentTarget,
		items: currentTarget,
		onOpen(container, activeItem) {
			currentTarget.classList.add('hide-icon')
			if (activeItem.thumb.includes('327')) {
				// turn volume to 50% on agent 327 vid
				container.querySelector('video').volume = 0.5
			} else if (activeItem.sources?.includes('audio')) {
				container.classList.add('bp-audio')
				// play / pause on audio image click
				const audio = container.querySelector('audio')
				listen(
					audio.parentNode,
					'click',
					self(() => {
						audio[audio.paused ? 'play' : 'pause']()
					})
				)
			}
		},
		onClosed: () => currentTarget.classList.remove('hide-icon'),
	})
}

function openThumbnails(e) {
	e.preventDefault()
	if (!bpThumbnails) {
		bpThumbnails = new BiggerPictureThumbnails({
			target: body,
		})
	}
	bpThumbnails.open({
		// position: 2,
		// scale: 1,
		// intro: 'fadeup',
		el: e.currentTarget,
		items: thumbnails,
		maxZoom: 4,
	})
}

function initInlineGallery() {
	if (!inlineBp) {
		inlineBp = new BiggerPicture({
			target: inlineWrap,
		})
	}
	let items = Array.from(imageLinks).map((link) => ({
		...link.dataset,
	}))
	inlineBp.open({
		items,
		position: 2,
		scale: 1,
		intro: 'fadeup',
		noClose: true,
		inline: true,
		maxZoom: 4,
	})
}

function openCode(e, node) {
	e.preventDefault()
	initBodyBp()
	bodyBp.open({
		el: node,
		items: [
			{
				html: document.getElementById(node.dataset.html).outerHTML,
				element: node,
			},
		],
		intro: 'fadeup',
	})
}

function createObserver() {
	let observer
	let options = {
		root: null,
		rootMargin: '0px',
		threshold: 0,
	}
	observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			observer.disconnect()
			initInlineGallery()
		}
	}, options)
	observer.observe(inlineWrap)
}

function makeTweetHtml(profileName, profileHandle, avatarUrl, content) {
	return `<div class="tweet"><div class="t-head"><img height="48" width="48" src="https://pbs.twimg.com/profile_images/${avatarUrl}" alt="avatar"/><a href="https://twitter.com/${profileHandle}" target="_blank"><span>${profileName}</span><span>@${profileHandle}</span></a><svg viewBox="0 0 24 24"><path d="M23.6 5c-.8.3-1.7.6-2.6.7 1-.6 1.7-1.5 2-2.6-.9.5-1.9 1-3 1.1a4.7 4.7 0 0 0-7.9 4.3 13 13 0 0 1-9.6-4.9A4.7 4.7 0 0 0 4 9.8c-.8 0-1.5-.2-2.2-.6v.1c0 2.3 1.7 4.1 3.8 4.6a4.7 4.7 0 0 1-2.1 0 4.7 4.7 0 0 0 4.3 3.3 9.3 9.3 0 0 1-6.9 2c2.1 1.2 4.5 2 7.2 2A13.2 13.2 0 0 0 21.3 7.4c1-.7 1.7-1.5 2.3-2.5z"/></svg></div>${content}</div>`
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// masonry setup
handleMasonry(document.querySelectorAll('.masonry'))

// BiggerPicture setup
handleNodes(imageLinks)
handleNodes(captionLinks)
handleNodes(responsiveExample)
handleVids(vidIframeLinks)

// code modals
for (let i = 0; i < htmlLinks.length; i++) {
	htmlLinks[i].addEventListener('click', (e) => openCode(e, htmlLinks[i]))
}

// firewatch click
firewatch.addEventListener('click', (e) => {
	e.preventDefault()
	initBodyBp()
	let component
	bodyBp.open({
		onClose() {
			component.isClosing = true
		},
		items: [{ element: e.currentTarget, html: '' }],
		onOpen: (container) => {
			component = new Firewatch({
				target: container.querySelector('.bp-html'),
			})
		},
	})
})

// dialog modal example
document.getElementById('dialog').addEventListener('click', (e) => {
	e.preventDefault()
	initBodyBp()
	bodyBp.open({
		intro: 'fadeup',
		items: [{ html: '' }],
		onOpen: (container) => {
			container.querySelector('.bp-controls').remove()
			container.classList.add('blur')
			new Dialog({
				target: container.querySelector('.bp-html'),
				props: { bp: bodyBp },
			})
		},
	})
})

// tweet
document.getElementById('tweet').addEventListener('click', (e) => {
	e.preventDefault()
	initBodyBp()
	let tweets = [
		{
			html: makeTweetHtml(
				'The Baller of the First Sin',
				'ByYourLogic',
				'1477900291475484674/FHyfowH4_normal.jpg',
				`<p>this picture is so fucking iconic. this was when Barney was in the studio for 16 hour sessions perfecting "Clean Up." believe it or not, people were writing him off because he hadn't had a hit in a while. little did they know he was about to change everything<a href="https://t.co/AFwh7OkKvn" target="_blank"><img src="https://assets.henrygd.me/bp/images/barney.jpg" alt="barney at desk"/></a></p>`
			),
		},
		{
			html: makeTweetHtml(
				'Human Mel',
				'melhuman',
				'1329824596288299011/m6MLoRZA_normal.jpg',
				`<p>"There was no place like it, in the whole world, like Coney Island when I was a youngster. No place in the world like it, and it was so fabulous. Now it's shrunk down to almost nothing."<a href="https://t.co/f4qRyQ1y0W" target="_blank"><img src="https://assets.henrygd.me/bp/images/bernie.jpg" alt="bernie sanders against backdrop of godspeed you black emperor album"/></a></p>`
			),
		},
	]
	bodyBp.open({
		intro: 'fadeup',
		items: window.innerWidth > 680 ? tweets : [tweets[0]],
	})
})

for (let i = 0; i < thumbnails.length; i++) {
	thumbnails[i].addEventListener('click', openThumbnails)
}

createObserver()

// plausible analytics
plausible()

body.addEventListener('mousedown', () => body.classList.add('using-mouse'))
body.addEventListener('keydown', () => body.classList.remove('using-mouse'))