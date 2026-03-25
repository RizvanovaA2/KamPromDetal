<?php
session_start();
if (!isset($_SESSION['admin_logged'])) {
    header('Location: login.php');
    exit;
}
require_once '../config.php';

$id = $_GET['id'] ?? 0;
$stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
$stmt->execute([$id]);
$product = $stmt->fetch();

if (!$product) {
    die('Товар не найден');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $category = trim($_POST['category']);
    $price_text = trim($_POST['price_text']);
    $description = trim($_POST['description']);
    $in_stock = isset($_POST['in_stock']) ? 1 : 0;

    $imagePath = $product['image'];

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        if ($imagePath && file_exists('../' . $imagePath)) {
            unlink('../' . $imagePath);
        }
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $filename = time() . '_' . uniqid() . '.' . $ext;
        $target = '../images/' . $filename;
        if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
            $imagePath = 'images/' . $filename;
        }
    }

    $stmt = $pdo->prepare("UPDATE products SET name=?, category=?, price_text=?, description=?, image=?, in_stock=? WHERE id=?");
    $stmt->execute([$name, $category, $price_text, $description, $imagePath, $in_stock, $id]);

    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Редактировать товар</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <h2>Редактирование товара</h2>
    <form method="post" enctype="multipart/form-data">
        <div class="mb-3">
            <label class="form-label">Название *</label>
            <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($product['name']) ?>" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Категория</label>
            <input type="text" name="category" class="form-control" value="<?= htmlspecialchars($product['category']) ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Текст цены</label>
            <input type="text" name="price_text" class="form-control" value="<?= htmlspecialchars($product['price_text']) ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Описание</label>
            <textarea name="description" class="form-control" rows="3"><?= htmlspecialchars($product['description']) ?></textarea>
        </div>
        <div class="mb-3">
            <label class="form-label">Изображение</label>
            <?php if ($product['image']): ?>
                <div class="mb-2">
                    <img src="../<?= $product['image'] ?>" width="100" alt="">
                </div>
            <?php endif; ?>s
            <input type="file" name="image" class="form-control" accept="image/*">
            <small class="text-muted">Оставьте пустым, чтобы не менять картинку</small>
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" name="in_stock" class="form-check-input" <?= $product['in_stock'] ? 'checked' : '' ?>>
            <label class="form-check-label">В наличии</label>
        </div>
        <button type="submit" class="btn btn-primary">Сохранить</button>
        <a href="index.php" class="btn btn-secondary">Отмена</a>
    </form>
</div>
</body>
</html>