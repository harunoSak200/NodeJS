#include<bits/stdc++.h>
using namespace std ; 
int main(){
	
	
	ios_base::sync_with_stdio(false);

    cin.tie(NULL);
    
    int m , n ; 
    cin >> m >> n  ; 
    
    vector<int>v ; 
    
    for(int i = 0 ; i < m ; i++){
    	int x ; 
    	cin >>x ; 
    	v.push_back(x) ; 
    }
    
    cin.ignore() ; 
    
    while(n-->0)
    {
    	string q ; 
    	getline(cin , q) ;
    	
    	
    	
    	if(q == "pop_back"){
    		v.pop_back() ;
    	}
    	else if(q == "back"){
    		cout << v.back() << endl;
    	}
    	else if(q == "front"){
    		cout << v.front() << endl;
    	}
    	else if(q.substr(0 , 5) == "sort ")
    	{
    		
    		int x , y;
    		stringstream ss(q.substr(5)) ;
    		ss >> x >> y ; 
    		sort(v.begin()+x-1 , v.begin()+y) ; 
    	}
    	else if(q.substr(0 , 8) == "reverse "){
    		
    		int x , y;
    		stringstream ss(q.substr(8)) ;
    		ss >> x >> y ; 
    		
    		
    		reverse(v.begin()+x-1 , v.begin()+y) ; 
    	}
    	
    	else if(q.substr(0,10) == "push_back "){
    		v.push_back(stoi(q.substr(10))) ;
    		
    	}
    	
    	else if(q.substr(0 , 6) == "print ")
    	{
    		cout << v[stoi(q.substr(6))-1] << endl;
    		cout << v[stoi(q.substr(6))-1] << endl;
    		cout << v[stoi(q.substr(6))-1] << endl;
    		
    		
    	}
    }
    
	
	
	return 0 ; 
}