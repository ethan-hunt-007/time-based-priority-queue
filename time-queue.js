function TimeQueue(MAX_ELEMENTS) {
	this.front = -1;
	this.rear = -1;
	this.MAX_ELEMENTS = MAX_ELEMENTS;
	this._queue = new Array(this.MAX_ELEMENTS);
}

TimeQueue.prototype.enqueue = function(data) {
	if(this.rear >= this.MAX_ELEMENTS - 1) {
		return;
	}
	if((this.front == -1) && (this.rear == -1)) {
		this.front++;
		this.rear++;
		this._queue[this.rear] = data;
	} else {
		this.prioritize(data);
		this.rear++;
	}
}

TimeQueue.prototype.prioritize = function(data) {
	var i,j;
	for(i = this.front; i<= this.rear; i++) {
		if(data.priority >= this._queue[i].priority) {
			for(j = this.rear + 1; j > i; j--) {
				this._queue[j] = this._queue[j-1];
			}
			this._queue[i] = data;
			return;
		}
	}
	this._queue[i] = data;
}

TimeQueue.prototype.deque = function() {
	if(this.front > this.rear) {
		return;
	}
	return this._queue[this.front++];
}

module.exports = TimeQueue;