<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Graciano Tilaar</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <nav>
        <a href="index.html">Home</a>
        <a href="blog.php" class="active">Blog</a>
        <a href="#gallery">Gallery</a>
        <a href="#contact">Contact</a>
    </nav>

    <?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include 'db_connect.php';
    ?>

    <!-- Blog section -->
    <section id="blog" class="container">
        <h1>Blog</h1>
        <?php
        $sql = "SELECT title, content FROM blog";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo '<article class="article fade-target">';
                echo '<h2>' . htmlspecialchars($row['title']) . '</h2>';
                echo '<p>' . htmlspecialchars($row['content']) . '</p>';
                echo '</article>';
            }
        } else {
            echo '<p>No posts available.</p>';
        }
        mysqli_close($conn);
        ?>
    </section>
    
    <script src="script.js"></script>

</body>
</html>