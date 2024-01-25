# Reference

## Create Shortened URL

```http
POST /
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `redirectURL` | `string` | **Required**. Original URL to be shortened. |

**Example Request:**
```json
{
  "redirectURL": "https://example.com"
}
```

**Example Response:**
```json
{
  "id": "ABC123"
}
```

## Redirect to Original URL

```http
GET /:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Unique ID of the shortened URL. |

*Redirects the user to the original URL.*

## Get URL Analytics

```http
GET /analytics/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Unique ID of the shortened URL. |

**Example Response:**
```json
{
  "totalClicks": 10,
  "history": [
    { "time": "2024-01-23T12:34:56Z" },
    // ... (other timestamp entries)
  ]
}
```

This documentation provides details about each API endpoint, including their parameters, request bodies (if applicable), and expected responses. Customize the details based on the actual structure of your API responses and requests.
