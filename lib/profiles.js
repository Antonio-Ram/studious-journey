const fs = require("fs");
const path = require('path');

function filterByQuery(query, profilesArray) {
    let filteredResults = profilesArray;
    if (query.city) {
        filteredResults = filteredResults.filter(profile => profile.city === query.city);
    }
    if (query.last_name) {
        filteredResults = filteredResults.filter(profile => profile.last_name === query.last_name);
    }
    if (query.first_name) {
        filteredResults = filteredResults.filter(profile => profile.first_name === query.first_name);
    }
    return filteredResults;
}

function findById(id, profilesArray) {
    const result = profilesArray.filter(profile => profile.id === id) [0];
    return result;
}

function createNewProfile(body, profilesArray) {
    const profile = body;
    profilesArray.push(profile);
    fs.writeFileSync(
        path.join(__dirname, '../data/profiles.json'),
        JSON.stringify({ profiles: profilesArray }, null, 2)
    );
    return profile;
}

function validateProfile(profile) {
    if (!profile.first_name || typeof profile.first_name !== 'string') {
        return false;
    }
    if (!profile.last_name || typeof profile.last_name !== 'string') {
        return false;
    }
    if (typeof profile.city !== 'string') {
        return false;
    }
    if (!profile.email || typeof profile.email !=='string') {
        return false;
    }
    if (typeof profile.PassWord !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewProfile,
    validateProfile
};
