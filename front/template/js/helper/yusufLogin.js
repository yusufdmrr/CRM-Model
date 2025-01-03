async function getUsers(userId) {
    try {
        let response = await axios.post('http://localhost:3001/api/v1/crm/user/getUsers', {userId}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN_HERE'
            }
        });

        return response.data; 
    } catch (error) {
        console.error('Kullanıcı bilgilerini alma hatası:', error);
        throw error; 
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
      const userId = 'userIdGelenDeğer'; 
      let userData = await getUsers(userId); 
  
     console.log("Kullanıcı Verisi:", userData);
  
      const userNameElement = document.getElementById('user-name');
      const userDepartmanElement = document.getElementById('user-departman');

      if (userData && userData.data && userData.data.length > 0) {
        const user = userData.data[0];
        // console.log(user) 

        userNameElement.textContent = `${user.name} ${user.surname}`; 
        userDepartmanElement.textContent = user.department || 'Departman Bilgisi Yok'; 
  
      } else {
        console.error('Kullanıcı verisi bulunamadı.');
        userNameElement.textContent = 'Kullanıcı Bulunamadı';
        userDepartmanElement.textContent = 'Departman Bilgisi Yok';
      }
  
    } catch (error) {
      console.error("Kullanıcı bilgileri yüklenirken bir hata oluştu:", error);

      const userNameElement = document.getElementById('user-name');
      const userDepartmanElement = document.getElementById('user-departman');
  
      userNameElement.textContent = 'Hata';
      userDepartmanElement.textContent = 'Bilgiler yüklenemedi.';
    }
  });