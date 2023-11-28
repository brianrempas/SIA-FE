import axios from 'axios';

export async function fetchLogin( username: string, password: string ) {
  
  interface LoginResponse {
    message: any;
    status: number;
    token?: any;
  }

  try {
    const response = await axios.post('http://localhost:3000/api/loginuser', {
      username,
      password,
    });

    var respond: LoginResponse = {
      message: response.data.message,
      status: response.status
    }

    switch(response.status) {
      case 201:
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        respond.token = token
        return respond;
      case 200:
        return respond;
      case 400:
        return respond;
      default:
        throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }

}

export async function createAny( data: any, token: any, url: any ) {
  
  interface type {
    data: any;
    status: number;
  }

  try {
    const response = await axios.post(`${url}`, {
      data
    }, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    
    var respond: type = {
      data: response.data,
      status: response.status
    }

    return respond;
    
  } catch (error) {
    throw error;
  }

}

export async function getAny( token: any, url: any ) {
  
  interface LoginResponse {
    data: any;
    status: number;
  }

  try {
    const response = await axios.get(`${url}`,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    
    var respond: LoginResponse = {
      data: response.data,
      status: response.status
    }

    return respond;
    
  } catch (error) {
    throw error;
  }

}

export async function updateAny( data: any, token: any, url: any ) {
  
  interface type {
    data: any;
    status: number;
  }

  try {
    const response = await axios.put(`${url}`, {
      data
    }, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    
    var respond: type = {
      data: response.data,
      status: response.status
    }

    return respond;
    
  } catch (error) {
    throw error;
  }

}

export async function deleteAny( id: number, token: any, url: any ) {
  
  interface type {
    data: any;
    status: number;
  }

  try {
    const response = await axios.delete(`${url}/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    
    var respond: type = {
      data: response.data,
      status: response.status
    }

    return respond;
    
  } catch (error) {
    throw error;
  }

}


