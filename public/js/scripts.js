const form = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');

const fetchItems = async () => {
  try {
    const response = await fetch('/api/items');
    const items = await response.json();
    itemList.innerHTML = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item.name}: ${item.description}`;
      itemList.appendChild(li);
    });
  } catch (err) {
    console.error('Error fetching items:', err);
  }
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  try {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });

    if (response.ok) {
      form.reset();
      fetchItems();
    } else {
      const errorData = await response.json();
      console.error('Error adding item:', errorData.message);
    }
  } catch (err) {
    console.error('Error:', err);
  }
});

fetchItems();