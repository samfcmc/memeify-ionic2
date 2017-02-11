import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

const BASE_URL = "http://version1.api.memegenerator.net/";

const ENDPOINTS = {
	INSTANCES: {
		SELECT_BY_NEW: "Instances_Select_ByNew"
	}
}

/**
 * Meme Generator API Client
 */
@Injectable() 
export class MemeClient {
	private http: Http;
	
	constructor(http: Http) {
		this.http = http;
	}

	/**
	 * Returns the complete URL for a given endpoint
	 * @param endpoint (string): The endpoint url
	 */
	private getUrl(endpoint: string): string {
		return BASE_URL + '/' + endpoint;
	}

	public getNew(page?: Number) : any {
		var url = this.getUrl(ENDPOINTS.INSTANCES.SELECT_BY_NEW);
		if(page) {
			url += '?pageIndex=' + page;
		}

		// HTTP Request
		return new Promise(resolve => {
			this.http.get(url).subscribe(response => {
				var json = response.json();
				resolve(json);
			});
		});
		

	}
}