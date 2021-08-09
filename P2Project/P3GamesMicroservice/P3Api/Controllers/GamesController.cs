using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;
using P3Database;

namespace P3Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly ILogger<GamesController> _logger;
        //private readonly DataContext _dataContext;
        private readonly IBusinessModel _businessModel;
        private readonly IWebHostEnvironment _hostEnvironment;

        public GamesController(IBusinessModel businessModel, ILogger<GamesController> logger, DataContext dataContext, IWebHostEnvironment hostEnvironment)
        {
            _businessModel = businessModel;
            _logger = logger;
            //_dataContext = dataContext;
            _dataContext = dataContext;
            _hostEnvironment = hostEnvironment;
        }

        /// <summary>
        /// Returns a list of all  games description
        /// </summary>
        /// <returns></returns>
        [HttpGet("List")]
        public async Task<IActionResult> GetGameInfoListAsync()
        {
            var games = await _businessModel.GameInfoListAsync();
            if (games != null)
                return StatusCode(200, games);
            else
                return StatusCode(500);
            List<GameDetail> gameDetails;

            gameDetails = _businessModel.GetGameInfoList();

            return StatusCode(200, gameDetails);
        }

        [HttpGet("Wtp")]
        public async Task<IActionResult> GetRandomPokemon()
        {
            var pokemon = await _businessModel.WhosThatPokemonGameAsync();
            return StatusCode(200, pokemon);
        }

        [HttpGet("SingleGame/{id}")]
        public IActionResult GetSingleGame(int id)
        {
            GameDetail gameInfo = _businessModel.SingleGame(id);

            if (gameInfo != null)
            {
                return StatusCode(200, gameInfo);
            }
            else
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Creates a game with only descriptions
        /// </summary>
        /// <param name="gameDetail"></param>
        /// <returns></returns>
        [HttpPost("CreateGame")]
        public async Task<ActionResult<GameInfo>> CreateGame([FromForm] GameDetail gameDetail)
        {
            gameDetail.ImageName = await SaveImage(gameDetail.ImageFile);

            GameInfo gameInfo = _businessModel.CreateGame(gameDetail);


            if (gameInfo != null)
            {
                return StatusCode(201, gameInfo);
            }
            else
            {
                return StatusCode(422, gameInfo);
            }
        }

        /// <summary>
        /// Modifies an existing game 
        /// </summary>
        /// <param name="gameDetail"></param>
        /// <returns></returns>

        [HttpPatch("ModifyGame")]
        public async Task<ActionResult<GameInfo>> ModifyGame([FromForm] GameDetail gameDetail)
        {
            if (gameDetail.ImageFile != null)
            {
                DeleteImage(gameDetail.OldImageName);
                gameDetail.ImageName = await SaveImage(gameDetail.ImageFile);

            }

            GameInfo gameInfo = _businessModel.ModifyGame(gameDetail);


            if (gameInfo != null)
            {
                return StatusCode(200, gameInfo);
            }
            else
            {
                return StatusCode(422, gameInfo);
            }
        }

        [HttpDelete("Delete/{id}")]
        public ActionResult DeleteGame(int id)
        {
            GameInfo gameInfo = _businessModel.DeleteGame(id);


            if (gameInfo.ImagePath != null || gameInfo.ImagePath != "")
            {
                DeleteImage(gameInfo.ImagePath);
            }

            if (gameInfo != null)
            {
                return StatusCode(200, gameInfo);
            }
            else
            {
                return NotFound();
            }

        }
        // Stores the image statically in the Image folder and returns a modified version of the name. 
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("ttmmssffff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath)) 
            {
                System.IO.File.Delete(imagePath);
            }
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddGameInfo(GameInfo gameInfo)
        {
            if (await _businessModel.AddGameInfoAsync(gameInfo))
                return StatusCode(201);
            else
                return StatusCode(500);
        }

        [HttpGet("RpsWin/{userId}")]
        public async Task<IActionResult> RpsWin(int userId)
        {
            var success = await _businessModel.RpsWinAsync(userId);
            return StatusCode(200, success);
        }

        [HttpGet("RpsLose/{userId}")]
        public async Task<IActionResult> RpsLose(int userId)
        {
            var success = await _businessModel.RpsLoseAsync(userId);
            return StatusCode(200, success);
        }

        [HttpGet("RpsRecord/{userId}")]
        public async Task<IActionResult> RpsRecord(int userId)
        {
            var success = await _businessModel.RpsRecordAsync(userId);
            return StatusCode(200, success);
        }

        [HttpGet("WtpWin/{userId}")]
        public async Task<IActionResult> WtpWin(int userId)
        {
            var success = await _businessModel.WtpWinAsync(userId);
            return StatusCode(200, success);
        }

        [HttpGet("WtpLose/{userId}")]
        public async Task<IActionResult> WtpLose(int userId)
        {
            var success = await _businessModel.WtpLoseAsync(userId);
            return StatusCode(200, success);
        }

        [HttpGet("WtpRecord/{userId}")]
        public async Task<IActionResult> WtpRecord(int userId)
        {
            var success = await _businessModel.WtpRecordAsync(userId);
            return StatusCode(200, success);
        }

        [HttpGet("CapWin/{userId}")]
        public async Task<IActionResult> CapWin(int userId)
        {
            var success = await _businessModel.CapWinAsync(userId);
            return StatusCode(200, success);
        }

        [HttpGet("CapLose/{userId}")]
        public async Task<IActionResult> CapLose(int userId)
        {
            var success = await _businessModel.CapLoseAsync(userId);
            return StatusCode(200, success);
        }

        [HttpGet("CapRecord/{userId}")]
        public async Task<IActionResult> CapRecord(int userId)
        {
            var success = await _businessModel.CapRecordAsync(userId);
            return StatusCode(200, success);
        }

        [HttpPut("WamPlayed/{userId}")]
        public async Task<IActionResult> WamPlayed(int userId, int highScore)
        {
            var success = await _businessModel.WamPlayedAsync(userId, highScore);
            return StatusCode(200, success);
        }

        [HttpGet("WamRecord/{userId}")]
        public async Task<IActionResult> WamRecord(int userId)
        {
            var success = await _businessModel.WamHighScoreAsync(userId);
            return StatusCode(200, success);
        }

    }
}