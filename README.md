# Part-Time Delta Platoon Personal Project

## RAM Tracker

RAM Tracker is a system that supports the National Health Physics Program (NHPP) in managing permitting information of Veterans Healthcare Administration (VHA) facilities that use radioactive materials (RAM). With over 117 different permittees, this program consolidates information and provides a portal for Radiation Safety Officers (RSOs) to update their contact information and access their RAM permit without contacting NHPP.

## Features

Unique user dashboards for RSOs and NHPP Program Managers (PMs)

PMs can:
- View documents that reference "Veterans Affairs" from the Nuclear Regulatory Commission's ADAMs database
- Create/update/delete permittees and RAM permits
- Create/update Radiation Safety Officers' demographic data
- Add new materials, authorized uses, authorized users(AUs) and permit programs
- View current RAM permit document with option to print

RSOs can:
- See their facility's basic demographic data
- Update their contact information
- View current RAM permit document with option to print
- Contact NHPP through email

## Third Party APIs

[VA Facilities API](https://developer.va.gov/explore/facilities/docs/facilities?version=current) - for most current facility name, address, and phone number

[ADAMS API](https://www.nrc.gov/site-help/developers/wba-api-developer-guide.pdf) - for list of documents that reference "Veterans Affairs"

## Stretch Goals

- Add ability to handle RSOs with multiple facilities and function to update the user's office code when changing facilities
- Add full CRUD capabilities for all nested information within the permit (ie. materials, AUs, etc)
- Add related table for permit conditions due to varying permit templates
- Add multiple permit templates based on program code(s)
- Add ability to document and track amendment requests
- Add feature to submit electronic amendment requests through RSO dashboard
- Add ability to document and track inspection information

## Installation

Before running this application, you must obtain a key for the VA Facilities API. It is an open source API and the dev key is easily obtained here (link to where to get key).

This project is compiled using Docker compose. To build and run the images locally, make sure you have Docker installed, navigate to the root of Personal_Project, and run: 

(`./run-compose.dev.sh va-api-key`)
