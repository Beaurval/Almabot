'use strict';
const today = new Date();
const request = require('request');
const cheerio = require('cheerio');
const url = 'http://www.krosmoz.com/fr/almanax/' + today.toISOString().split('T')[0];
const fs = require('fs');

const getPage = (cb) => {
    request(url, {
        timeout: 3000
    }, (error, response, body) => {
        if (!error) {
            cb(body);
        }
    });
};

const parsePage = (data) => {
    const $ = cheerio.load(data);
    let output = {};
    output.quest = $("#achievement_dofus .more-infos p").first().text();
    output.offrande = $("#achievement_dofus .more-infos .fleft").first().text().replace(/\s+/g,' ').trim();
    output.image = $("#achievement_dofus .more-infos .more-infos-content img").first().attr("src");
    output.bonusTitre = $("#achievement_dofus .mid").first().contents().get(2).data.replace(/\s+/g,' ').trim();
    output.bonus = $("#achievement_dofus .more").first().text().split('.')[0].trim()

    return output;
};

exports.getPage = getPage;
exports.parsePage = parsePage;